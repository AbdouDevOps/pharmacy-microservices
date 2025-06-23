package com.PharmaMaestro.service;

import com.PharmaMaestro.models.Pharmacist;
import com.PharmaMaestro.models.Shift;
import com.PharmaMaestro.repository.PharmacistRepository;
import com.PharmaMaestro.repository.ShiftRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShiftService {

    private final ShiftRepository shiftRepository;
    private final PharmacistRepository pharmacistRepository;

    // Méthode principale appelée lors du scan de badge


    
public String handleBadgeScan(String badgeIdClair) {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    // Récupérer tous les pharmaciens (ou une liste restreinte selon ta logique)
    List<Pharmacist> pharmacists = pharmacistRepository.findAll();

    Pharmacist matchedPharmacist = null;

    // Vérifier chaque pharmacien si son badge hashé correspond au badgeIdClair
    for (Pharmacist pharmacist : pharmacists) {
        String badgeHash = pharmacist.getBadge().getBadgeId(); // hash stocké

        if (encoder.matches(badgeIdClair, badgeHash)) {
            matchedPharmacist = pharmacist;
            break;
        }
    }

    if (matchedPharmacist == null) {
        return "Pharmacien introuvable pour le badge : " + badgeIdClair;
    }

    // Ensuite ta logique habituelle avec matchedPharmacist...

    LocalDate today = LocalDate.now();
    LocalTime now = LocalTime.now();

    Optional<Shift> existingShiftOpt = shiftRepository.findByPharmacistIdAndSessionDate(
            matchedPharmacist.getId(), today).stream().findFirst();

    if (existingShiftOpt.isEmpty()) {
        Shift newShift = new Shift();
        newShift.setPharmacistId(matchedPharmacist.getId());
        newShift.setSessionDate(today);
        newShift.setEntryTime(now);
        newShift.setStatus(Shift.ShiftStatus.OPEN);



        shiftRepository.save(newShift);

        matchedPharmacist.setSessionStatus(true);
        pharmacistRepository.save(matchedPharmacist);

        return "Entrée enregistrée à " + now;
    } else {
        Shift shift = existingShiftOpt.get();

        if (shift.getExitTime() == null) {
            shift.setExitTime(now);
            shiftRepository.save(shift);

            matchedPharmacist.setSessionStatus(false);
            pharmacistRepository.save(matchedPharmacist);

            return "Sortie enregistrée à " + now;
        } else {
            return "Vous avez déjà enregistré votre sortie aujourd’hui.";
        }
    }
}




    // S'exécute toutes les 5 secondes
    @Scheduled(fixedRate = 30 * 60 * 1000)
    public void closeExpiredShifts() {
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        List<Shift> openShifts = shiftRepository.findByExitTimeIsNull();
        System.out.println("l'appel est fait");
        

        for (Shift shift : openShifts) {
            Duration duration = Duration.between(shift.getEntryTime(), now);

            if (duration.getSeconds() >= 10) { // Pour test : 10 secondes
                shift.setExitTime(shift.getEntryTime().plusSeconds(10));
                shift.setStatus(Shift.ShiftStatus.AUTO_CLOSED);
                

                Optional<Pharmacist> pharmacistOpt = pharmacistRepository.findById(shift.getPharmacistId());
                pharmacistOpt.ifPresent(pharmacist -> {
                    pharmacist.setSessionStatus(false);
                    pharmacistRepository.save(pharmacist);
                });

                shiftRepository.save(shift);
                System.out.println("✅ Session auto-fermée pour le pharmacien ID: " + shift.getPharmacistId());
            }
        }
    }

}

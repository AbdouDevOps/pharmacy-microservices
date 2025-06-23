package com.gestion_de_stock.gestion_de_stock.service.implementation;

import com.gestion_de_stock.gestion_de_stock.DTO.AddMedicamentLotRequest;
import com.gestion_de_stock.gestion_de_stock.DTO.LowStockLotResponse;
import com.gestion_de_stock.gestion_de_stock.DTO.MedicamentDTO;
import com.gestion_de_stock.gestion_de_stock.mapper.LotMapper;
import com.gestion_de_stock.gestion_de_stock.model.Lots;
import com.gestion_de_stock.gestion_de_stock.model.Medicament;
import com.gestion_de_stock.gestion_de_stock.repository.LotsRepository;
import com.gestion_de_stock.gestion_de_stock.repository.MedicamentRepository;
import com.gestion_de_stock.gestion_de_stock.service.interfac.LotService;
import com.gestion_de_stock.gestion_de_stock.service.interfac.MedicamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Month;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class LotServiceImpl implements LotService {

    @Autowired
    private LotsRepository lotsRepository;

    @Autowired
    private MedicamentRepository medicamentRepository;
    @Autowired
    private MedicamentServiceImpl medicamentServiceImpl;

    @Autowired
    private LotMapper lotMapper;



    public Long countMedicamentsEnteredPerMonth(int year, int month) {
        List<Lots> all = lotsRepository.findAll();
        return all.stream()
                .filter(lot -> lot.getEntryDate() != null &&
                        lot.getEntryDate().getYear() == year &&
                        lot.getEntryDate().getMonthValue() == month)
                .count();
    }

    @Override
    public void addMedicament(AddMedicamentLotRequest request) {
        // Obtenir l'entité médicament
        MedicamentDTO medicament = medicamentServiceImpl.getMedicamentByName(request.getName());

        // Mapper le DTO vers l'entité Lots
        Lots lot = lotMapper.toEntity(request);
        lot.setId(UUID.randomUUID().toString());

        // Générer un lotNumber basé sur le nom du médicament + un identifiant
        String baseName = medicament.getName().toLowerCase().replaceAll("\\s+", ""); // ex: "Doliprane" -> "doliprane"
        String lotNumber = baseName.substring(0, Math.min(baseName.length(), 4)) + "_" + medicament.getId().substring(0, 4);
        lot.setLotNumber(lotNumber);

        // Lier le médicament
        lot.setMedicamentId(medicament.getId());

        // Sauvegarde
        lotsRepository.save(lot);
    }




    @Override
    public Map<Month, Integer> countMedicamentsEnteredPerMonth() {
        List<Lots> lots = lotsRepository.findAll();
        return lots.stream()
                .collect(Collectors.groupingBy(
                        lot -> lot.getEntryDate().getMonth(),
                        Collectors.summingInt(Lots::getQuantity)
                ));
    }

    @Override
    public List<LowStockLotResponse> alertLowStockMedicament() {

        List<Lots> allLots = lotsRepository.findAll();

        // 1. Calcule du total des quantités par medicamentId
        Map<String, Integer> stockByMedicament = allLots.stream()
                .collect(Collectors.groupingBy(
                        Lots::getMedicamentId,
                        Collectors.summingInt(Lots::getQuantity)
                ));

        // 2. Identifie les medicamentId avec stock < 10
        Set<String> lowStockMedIds = stockByMedicament.entrySet().stream()
                .filter(entry -> entry.getValue() < 10)
                .map(Map.Entry::getKey)
                .collect(Collectors.toSet());

        // 3. Retourne chaque lot dont le medicamentId est concerné
        return allLots.stream()
                .filter(lot -> lowStockMedIds.contains(lot.getMedicamentId()))
                .map(lot -> {
                    Medicament med = medicamentRepository.findMedicamentById(lot.getMedicamentId());
                    LowStockLotResponse response = new LowStockLotResponse();
                    response.setName(med.getName());
                    response.setQuantity(lot.getQuantity());
                    response.setEntryDate(lot.getEntryDate());
                    response.setExpirationDate(lot.getExpirationDate());
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<LowStockLotResponse> alertCriticalStockMedicament() {

        List<Lots> allLots = lotsRepository.findAll();

        // 1. Calcule du total des quantités par medicamentId
        Map<String, Integer> stockByMedicament = allLots.stream()
                .collect(Collectors.groupingBy(
                        Lots::getMedicamentId,
                        Collectors.summingInt(Lots::getQuantity)
                ));

        // 2. Identifie les medicamentId avec stock < 10
        Set<String> lowStockMedIds = stockByMedicament.entrySet().stream()
                .filter(entry -> entry.getValue() < 5)
                .map(Map.Entry::getKey)
                .collect(Collectors.toSet());

        // 3. Retourne chaque lot dont le medicamentId est concerné
        return allLots.stream()
                .filter(lot -> lowStockMedIds.contains(lot.getMedicamentId()))
                .map(lot -> {
                    Medicament med = medicamentRepository.findMedicamentById(lot.getMedicamentId());
                    LowStockLotResponse response = new LowStockLotResponse();
                    response.setName(med.getName());
                    response.setQuantity(lot.getQuantity());
                    response.setEntryDate(lot.getEntryDate());
                    response.setExpirationDate(lot.getExpirationDate());
                    return response;
                })
                .collect(Collectors.toList());
    }


    @Override
    @Transactional
    public void updateLotQuantity(String medicamentId, int quantityToRemove) {

        if (quantityToRemove <= 0) {
            throw new IllegalArgumentException("La quantité à retirer doit être > 0");
        }

        // 1. Récupérer les lots du médicament (triés par date d’entrée pour FIFO)
        List<Lots> lots = lotsRepository.findByMedicamentIdOrderByEntryDateAsc(medicamentId);

        int totalAvailable = lots.stream().mapToInt(Lots::getQuantity).sum();

        if (totalAvailable < quantityToRemove) {
            throw new IllegalArgumentException("Stock insuffisant pour retirer cette quantité.");
        }

        // 2. Réduire progressivement les quantités
        int remainingToRemove = quantityToRemove;

        for (Lots lot : lots) {
            if (remainingToRemove == 0) break;

            int available = lot.getQuantity();

            if (available >= remainingToRemove) {
                lot.setQuantity(available - remainingToRemove);
                remainingToRemove = 0;
            } else {
                lot.setQuantity(0);
                remainingToRemove -= available;
            }
        }

        // 3. Sauvegarder les modifications
        lotsRepository.saveAll(lots);
    }





}

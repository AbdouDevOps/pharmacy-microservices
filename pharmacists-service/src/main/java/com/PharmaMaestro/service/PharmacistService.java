package com.PharmaMaestro.service;

import com.PharmaMaestro.auth.utils.JwtUtil;
import com.PharmaMaestro.dto.BadgeDTO;
import com.PharmaMaestro.dto.PharmacistDTO;
import com.PharmaMaestro.models.Badge;
import com.PharmaMaestro.models.Pharmacist;
import com.PharmaMaestro.models.Shift;
import com.PharmaMaestro.repository.PharmacistRepository;
import com.PharmaMaestro.repository.ShiftRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PharmacistService {

    private final PharmacistRepository pharmacistRepository;
    private final ShiftRepository shiftRepository;

    
    @Autowired
    private JwtUtil jwtUtil;

@Autowired
private PasswordEncoder passwordEncoder;



    // -------------------- Pharmacist CRUD --------------------

    public Pharmacist addPharmacist(Pharmacist pharmacist) {
        Optional<Pharmacist> exist = pharmacistRepository.findByUserName(pharmacist.getUserName());
        if (exist.isPresent()) {
            throw new IllegalArgumentException("Username déjà utilisé");
        }
        pharmacist.setActive(true);
        pharmacist.setSessionStatus(false);

        // Sauvegarde pharmacien sans sessions
        Pharmacist savedPharmacist = pharmacistRepository.save(pharmacist);

        // Sauvegarde les shifts en assignant le pharmacistId
        saveShiftsForPharmacist(savedPharmacist);

        return savedPharmacist;
    }

    public List<Pharmacist> addManyPharmacists(List<Pharmacist> pharmacists) {
        for (Pharmacist pharmacist : pharmacists) {
            Optional<Pharmacist> exist = pharmacistRepository.findByUserName(pharmacist.getUserName());
            if (exist.isPresent()) {
                throw new IllegalArgumentException("Username déjà utilisé: " + pharmacist.getUserName());
            }
            pharmacist.setActive(true);
            pharmacist.setSessionStatus(false);
        }
        List<Pharmacist> savedPharmacists = pharmacistRepository.saveAll(pharmacists);

        // Sauvegarde les shifts pour chaque pharmacien
        for (Pharmacist pharmacist : savedPharmacists) {
            saveShiftsForPharmacist(pharmacist);
        }
        return savedPharmacists;
    }



   // -------------------- Reset Password --------------------
    public ResponseEntity<?> resetPassword(String token, Map<String, String> requestBody) {
        // Vérification du token
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Authorization header is missing or invalid"));
        }

        token = token.substring(7);

        try {
            if (jwtUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Token is expired"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid token"));
        }

        // Extraction des champs du body
        String username = requestBody.get("username");
        String oldPassword = requestBody.get("oldPassword");
        String newPassword = requestBody.get("newPassword");

        if (username == null || oldPassword == null || newPassword == null ||
                oldPassword.trim().isEmpty() || newPassword.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "username, oldPassword and newPassword are required"));
        }

        try {
            Optional<Pharmacist> pharmacistOpt = pharmacistRepository.findByUserName(username);

            if (pharmacistOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Pharmacist not found"));
            }

            Pharmacist pharmacist = pharmacistOpt.get();

            // Vérifier l'ancien mot de passe

        if (!BCrypt.checkpw(oldPassword, pharmacist.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Old password is incorrect lfkelfnekjfe"));
        }
            // Le mot de passe est encodé, on ne peut pas le décoder, mais on peut le comparer avec matches

            // Encoder et mettre à jour le nouveau mot de passe
            pharmacist.setPassword(new BCryptPasswordEncoder().encode(newPassword));
            pharmacistRepository.save(pharmacist);

            return ResponseEntity.ok(Map.of("message", "Password updated successfully"));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", "Server error: " + e.getMessage()));
        }
    }

    

    // -------------------- Reset Password as Admin --------------------
    public ResponseEntity<?> resetPasswordAsAdmin(String token, Map<String, String> requestBody) {
        // 1. Vérifier le token
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Authorization header is missing or invalid"));
        }

        token = token.substring(7);

        try {
            if (jwtUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Token is expired"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid token"));
        }

        // 2. Récupérer le Head_Pharmacist
        String requesterUsername = jwtUtil.extractUserName(token);
        Optional<Pharmacist> requesterOpt = pharmacistRepository.findByUserName(requesterUsername);

        if (requesterOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Requesting user not found"));
        }

        Pharmacist requester = requesterOpt.get();

        if (requester.getPost() != Pharmacist.Post.Head_Pharmacist) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", "You are not authorized to reset passwords"));
        }

        // 3. Lire les champs requis
        String targetUsername = requestBody.get("username");
        String newPassword = requestBody.get("newPassword");

        if (targetUsername == null || newPassword == null || newPassword.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "username and newPassword are required"));
        }

        // 4. Récupérer le pharmacien cible
        Optional<Pharmacist> targetOpt = pharmacistRepository.findByUserName(targetUsername);
        if (targetOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Target pharmacist not found"));
        }



            // Le mot de passe est encodé, on ne peut pas le décoder, mais on peut le comparer avec matches

        Pharmacist target = targetOpt.get();
        target.setPassword(new BCryptPasswordEncoder().encode(newPassword));
        pharmacistRepository.save(target);

        return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
    }



    public List<Pharmacist> getAllPharmacists() {
        return pharmacistRepository.findAll();
    }


    // update un pharmacien
    public ResponseEntity<?> updateProfile(Pharmacist updatedPharmacist) {
        Optional<Pharmacist> existingPharmacistOpt = pharmacistRepository.findByUserName(updatedPharmacist.getUserName());
        if (existingPharmacistOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Pharmacist not found"));
        }

        System.out.println("Updating pharmacist: " + updatedPharmacist.getUserName());

        Pharmacist existingPharmacist = existingPharmacistOpt.get();
        existingPharmacist.setFirstName(updatedPharmacist.getFirstName());
        existingPharmacist.setLastName(updatedPharmacist.getLastName());
        existingPharmacist.setUserName(updatedPharmacist.getUserName());
        existingPharmacist.setPhoneNumber(updatedPharmacist.getPhoneNumber());
        existingPharmacist.getAddress().setHouseNumber(updatedPharmacist.getAddress().getHouseNumber());
        existingPharmacist.getAddress().setStreet(updatedPharmacist.getAddress().getStreet());
        existingPharmacist.getAddress().setApartment(updatedPharmacist.getAddress().getApartment());

        
        // Mettre à jour est fait avec success
        pharmacistRepository.save(existingPharmacist);
        return ResponseEntity.ok(Map.of("message", "Pharmacist updated successfully"));

 
        
    }


    // -------------------- Pharmacist Login --------------------

    /**
     * Authentifie un pharmacien si actif, session autorisée et mot de passe correct.
     */
    public Pharmacist loginPharmacist(String userName, String password) {
        Optional<Pharmacist> optionalPharmacist = pharmacistRepository.findByUserName(userName);
        if (optionalPharmacist.isEmpty()) {
            throw new IllegalArgumentException("Pharmacien non trouvé");
        }

        Pharmacist pharmacist = optionalPharmacist.get();
        if (!pharmacist.isActive() || !pharmacist.getSessionStatus()) {
            throw new IllegalArgumentException("Pharmacien inactif ou session non autorisée");
        }

        // Vérification du mot de passe (supposé déjà hashé dans la base de données)
        if (!pharmacist.getPassword().equals(password)) {
            throw new IllegalArgumentException("Mot de passe incorrect");
        }

        return pharmacist;
    }

    // -------------------- Shifts --------------------

    public List<Shift> getShiftsByPharmacistId(String pharmacistId) {
        return shiftRepository.findByPharmacistId(pharmacistId);
    }

    // -------------------- Private Helpers --------------------

    private void saveShiftsForPharmacist(Pharmacist pharmacist) {
        if (pharmacist.getSessions() != null) {
            for (Shift shift : pharmacist.getSessions()) {
                shift.setPharmacistId(pharmacist.getId());
                shiftRepository.save(shift);
            }
        }
    }

    // D’autres méthodes (get, update, delete) peuvent être ajoutées ici

    
    public PharmacistDTO convertToDTO(Pharmacist pharmacist) {
        if (pharmacist == null) {
            return null;
        }

        PharmacistDTO dto = new PharmacistDTO();
        dto.setFirstName(pharmacist.getFirstName());
        dto.setLastName(pharmacist.getLastName());
        dto.setUserName(pharmacist.getUserName());
        dto.setPhoneNumber(pharmacist.getPhoneNumber());
        dto.setActive(pharmacist.isActive());
        dto.setSalary(pharmacist.getSalary());
        dto.setPost(pharmacist.getPost());
        dto.setAddress(pharmacist.getAddress());
        dto.setSessions(pharmacist.getSessions());
        dto.setSessionStatus(pharmacist.getSessionStatus());

        // Convert badge
        Badge badge = pharmacist.getBadge();
        if (badge != null) {
            BadgeDTO badgeDTO = new BadgeDTO();
            badgeDTO.setDateAssigned(
                badge.getDateAssigned() != null ? badge.getDateAssigned().toString() : null
            );
            badgeDTO.setImageBase64(badge.getImageBase64()); // assuming getter exists
            dto.setBadge(badgeDTO);
        }

        return dto;
    }


}

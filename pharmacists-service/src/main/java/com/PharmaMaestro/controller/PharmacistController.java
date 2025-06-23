package com.PharmaMaestro.controller;

import com.PharmaMaestro.auth.utils.JwtUtil;
import com.PharmaMaestro.dto.PharmacistDTO;
import com.PharmaMaestro.dto.PharmacistWithAutoClosedSessionsDTO;
import com.PharmaMaestro.models.Badge;
import com.PharmaMaestro.models.Pharmacist;
import com.PharmaMaestro.models.PharmacistAddress;
import com.PharmaMaestro.models.Shift;
import com.PharmaMaestro.repository.PharmacistRepository;
import com.PharmaMaestro.repository.ShiftRepository;
import com.PharmaMaestro.service.PharmacistService;
import com.mongodb.client.gridfs.model.GridFSFile;

import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.time.format.DateTimeParseException;
import java.util.*;

@RestController
@RequestMapping("/api/pharmacists")
@RequiredArgsConstructor
public class PharmacistController {

    private final PharmacistRepository pharmacistRepository;
    private final ShiftRepository shiftRepository;
    private final PharmacistService pharmacistService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private GridFsTemplate gridFsTemplate;



    
    // Ajouter un pharmacien
    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addPharmacist(
            @RequestParam String firstName,
            @RequestParam String lastName,
            @RequestParam String userName,
            @RequestParam String password,
            @RequestParam String phoneNumber,
            @RequestParam double salary,
            @RequestParam String post,
            @RequestParam("address.street") String street,
            @RequestParam("address.houseNumber") String houseNumber,
            @RequestParam("address.apartment") String apartment,
            @RequestParam("badge.badgeId") String badgeId,
            @RequestParam("badge.dateAssigned") String dateAssigned,
            @RequestPart(value = "badgeImage", required = false) MultipartFile badgeImage
    ) {
        try {
            Pharmacist pharmacist = new Pharmacist();
            pharmacist.setFirstName(firstName);
            pharmacist.setLastName(lastName);
            pharmacist.setUserName(userName);
            pharmacist.setPassword(new BCryptPasswordEncoder().encode(password));
            pharmacist.setPhoneNumber(phoneNumber);
            pharmacist.setSalary(salary);
            pharmacist.setPost(Pharmacist.Post.valueOf(post));
            pharmacist.setActive(true);
            pharmacist.setSessionStatus(false);

            PharmacistAddress address = new PharmacistAddress();
            address.setStreet(street);
            address.setHouseNumber(houseNumber);
            address.setApartment(apartment);
            pharmacist.setAddress(address);

            Badge badge = new Badge();
            badge.setBadgeId(badgeId);
            badge.setDateAssigned(Date.from(Instant.parse(dateAssigned)));

            if (badgeImage != null && !badgeImage.isEmpty()) {
                ObjectId imageId = gridFsTemplate.store(
                        badgeImage.getInputStream(),
                        badgeImage.getOriginalFilename(),
                        badgeImage.getContentType()
                );
                badge.setImageId(imageId.toString());
            }

            pharmacist.setBadge(badge);

            Pharmacist savedPharmacist = pharmacistService.addPharmacist(pharmacist);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPharmacist);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid enum value for 'post'");
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("Invalid date format. Expected ISO-8601 (ex: 2023-10-25T14:30:00Z)");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error processing image");
        }
    }





    // Ajouter plusieurs pharmaciens
    @PostMapping("/addMany")
    public ResponseEntity<?> addManyPharmacists(@RequestBody List<Pharmacist> pharmacists) {
        try {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            for (Pharmacist pharmacist : pharmacists) {
                String rawPassword = pharmacist.getPassword();
                if (rawPassword != null && !rawPassword.isEmpty()) {
                    pharmacist.setPassword(encoder.encode(rawPassword));
                }
                if (pharmacist.getBadge() != null && pharmacist.getBadge().getBadgeId() != null) {
                    String rawBadgeId = pharmacist.getBadge().getBadgeId();
                    pharmacist.getBadge().setBadgeId(encoder.encode(rawBadgeId));
                }
            }
            List<Pharmacist> savedPharmacists = pharmacistService.addManyPharmacists(pharmacists);
            return new ResponseEntity<>(savedPharmacists, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur interne du serveur", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    // Authentification
    @PostMapping("/login")
    public ResponseEntity<?> loginPharmacist(@RequestBody Pharmacist user) {
        if (user.getUserName() == null || user.getUserName().isEmpty() ||
                user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username or password is missing"));
        }

        Optional<Pharmacist> userOpt = pharmacistRepository.findByUserName(user.getUserName());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not found"));
        }

        Pharmacist userFromDB = userOpt.get();

        if (userFromDB.getSessionStatus() == null || !userFromDB.getSessionStatus()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "You must scan your badge before logging in"));
        }

        if (!BCrypt.checkpw(user.getPassword(), userFromDB.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Incorrect password"));
        }

        String jwtToken = jwtUtil.generateJWTPharmacist(Optional.of(userFromDB));
        return ResponseEntity.ok(Map.of(
                "token", jwtToken,
                "message", "Authentication successful"
        ));
    }




    // Récupérer le pharmacien courant
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentPharmacist(@RequestHeader("Authorization") String token) {
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

        try {
            String username = jwtUtil.extractUserName(token);
            Optional<Pharmacist> pharmacistOpt = pharmacistRepository.findByUserName(username);

            if (pharmacistOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "User not found"));
            }

            Pharmacist pharmacist = pharmacistOpt.get();

            List<Shift> shifts = shiftRepository.findByPharmacistId(pharmacist.getId());
            pharmacist.setSessions(shifts);

            if (pharmacist.getBadge() != null && pharmacist.getBadge().getImageId() != null) {
                try {
                    ObjectId imageId = new ObjectId(pharmacist.getBadge().getImageId());
                    GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(imageId)));

                    if (file != null) {
                        InputStream inputStream = gridFsTemplate.getResource(file).getInputStream();
                        byte[] imageBytes = inputStream.readAllBytes();
                        String base64Image = Base64.getEncoder().encodeToString(imageBytes);
                        pharmacist.getBadge().setImageBase64(base64Image);
                    }
                } catch (Exception e) {
                    System.err.println("Error loading image: " + e.getMessage());
                }
            }

            PharmacistDTO dto = pharmacistService.convertToDTO(pharmacist);
            return ResponseEntity.ok(dto);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", "Server error: " + e.getMessage()));
        }
    }




    // Récupérer tous les pharmaciens
    @GetMapping("/getall")
    public ResponseEntity<List<Pharmacist>> getAllPharmacists() {
        List<Pharmacist> pharmacists = pharmacistRepository.findAll();
        if (pharmacists.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(pharmacists, HttpStatus.OK);
    }




    // Récupérer un pharmacien par ID
    @GetMapping("/getById/{id}")
    public ResponseEntity<Pharmacist> getPharmacistById(@PathVariable String id) {
        Optional<Pharmacist> pharmacistOpt = pharmacistRepository.findById(id);
        if (pharmacistOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Pharmacist pharmacist = pharmacistOpt.get();
        List<Shift> shifts = shiftRepository.findByPharmacistId(pharmacist.getId());
        pharmacist.setSessions(shifts);
        return new ResponseEntity<>(pharmacist, HttpStatus.OK);
    }




    // Récupérer les sessions d'un pharmacien
    @GetMapping("/getpharmacistssessions/{pharmacistId}")
    public ResponseEntity<List<Shift>> getPharmacistSessions(@PathVariable String pharmacistId) {
        List<Shift> shifts = pharmacistService.getShiftsByPharmacistId(pharmacistId);
        if (shifts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(shifts, HttpStatus.OK);
    }




    // Supprimer un pharmacien par ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePharmacistById(@PathVariable String id) {
        Optional<Pharmacist> pharmacistOpt = pharmacistRepository.findById(id);
        if (pharmacistOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Shift> shifts = shiftRepository.findByPharmacistId(id);
        if (!shifts.isEmpty()) {
            shiftRepository.deleteAll(shifts);
        }

        pharmacistRepository.deleteById(id);

        return new ResponseEntity<>(Map.of("message", "Pharmacist and related sessions deleted successfully"), HttpStatus.OK);
    }




    // Récupérer les pharmaciens avec sessions AUTO_CLOSED
    @GetMapping("/withAutoClosedSessions")
    public ResponseEntity<List<PharmacistWithAutoClosedSessionsDTO>> getPharmacistsWithAutoClosedSessions() {
        List<PharmacistWithAutoClosedSessionsDTO> result = new ArrayList<>();
        List<Pharmacist> pharmacists = pharmacistRepository.findAll();
        for (Pharmacist pharmacist : pharmacists) {
            List<Shift> autoClosedShifts = shiftRepository.findByPharmacistIdAndStatus(pharmacist.getId(), "AUTO_CLOSED");
            if (!autoClosedShifts.isEmpty()) {
                PharmacistWithAutoClosedSessionsDTO dto = new PharmacistWithAutoClosedSessionsDTO();
                dto.setPharmacistId(pharmacist.getId());
                dto.setFirstName(pharmacist.getFirstName());
                dto.setLastName(pharmacist.getLastName());
                dto.setPhoneNumber(pharmacist.getPhoneNumber());
                dto.setSessions(autoClosedShifts);
                dto.setAutoClosedSessionCount(autoClosedShifts.size());
                dto.setPost(pharmacist.getPost());
                dto.setUserName(pharmacist.getUserName());
                result.add(dto);
            }
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }



    @PostMapping("/admin/resetPassword")
    public ResponseEntity<?> resetPasswordAsAdmin(
        @RequestHeader("Authorization") String token,
        @RequestBody Map<String, String> requestBody) {
    return pharmacistService.resetPasswordAsAdmin(token, requestBody);
    }

    @PostMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(
        @RequestHeader("Authorization") String token,
        @RequestBody Map<String, String> requestBody) {
    return pharmacistService.resetPassword(token, requestBody);
    }



@PostMapping("/updateProfile")
public ResponseEntity<?>  updatePharmacist(@RequestBody Pharmacist requestBody) {
    System.out.println("Received request to update pharmacist profile: " + requestBody);
    return pharmacistService.updateProfile(requestBody);
}
}


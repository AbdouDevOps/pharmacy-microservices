package com.PharmaMaestro.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.PharmaMaestro.models.Pharmacist;

public interface PharmacistRepository extends MongoRepository<Pharmacist, String> {

    // Trouver un pharmacien par le code badge (déjà donné)
    Optional<Pharmacist> findByBadge_BadgeId(String badgeId);

    // Trouver un pharmacien par username
    Optional<Pharmacist> findByUserName(String username);

    // Trouver tous les pharmaciens actifs (Sessionstatus = true)
    List<Pharmacist> findBySessionStatusTrue();

    // Trouver tous les pharmaciens inactifs
    List<Pharmacist> findBySessionStatusFalse();

    // Rechercher pharmaciens par nom (case insensitive, partiel)
    List<Pharmacist> findByLastNameIgnoreCaseContaining(String lastName);

    //findbyid
    Optional<Pharmacist> findById(String id);

}

package com.PharmaMaestro.repository;

import com.PharmaMaestro.models.Shift;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ShiftRepository extends MongoRepository<Shift, String> {

    // Trouver tous les shifts d'un pharmacien
    List<Shift> findByPharmacistId(String pharmacistId);

    // Trouver tous les shifts d'une date précise
    List<Shift> findBySessionDate(LocalDate sessionDate);

    // Trouver tous les shifts d'un pharmacien à une date donnée
    List<Shift> findByPharmacistIdAndSessionDate(String pharmacistId, LocalDate sessionDate);
    
    List<Shift> findByPharmacistIdAndSessionDateAndExitTimeIsNull(String pharmacistId, LocalDate sessionDate);

    List<Shift> findByExitTimeIsNull();

    List<Shift> findByPharmacistIdAndStatus(String pharmacistId, String status);



}

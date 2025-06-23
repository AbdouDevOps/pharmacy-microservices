package com.gestion_de_stock.gestion_de_stock.repository;

import com.gestion_de_stock.gestion_de_stock.model.Medicament;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MedicamentRepository extends MongoRepository<Medicament, String> {

    Optional<Medicament> findFirstById(String id);
    List<Medicament> findByCategory(String category);
    Optional<Medicament> findFirstByName(String name);
    Medicament findMedicamentById(String id);
}

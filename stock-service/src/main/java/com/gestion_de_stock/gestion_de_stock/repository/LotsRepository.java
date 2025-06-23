package com.gestion_de_stock.gestion_de_stock.repository;

import com.gestion_de_stock.gestion_de_stock.model.Lots;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LotsRepository extends MongoRepository<Lots, String> {

    List<Lots> findByMedicamentId(String medicamentId);
//    List<Lots> findByQuantity(int quantity);
    List<Lots> findByMedicamentIdOrderByEntryDateAsc(String medicamentId);



}

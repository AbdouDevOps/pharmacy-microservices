package com.gestion_de_stock.gestion_de_stock.repository;

import com.gestion_de_stock.gestion_de_stock.model.Historique;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HistoriqueRepository extends MongoRepository<Historique, String> {
}

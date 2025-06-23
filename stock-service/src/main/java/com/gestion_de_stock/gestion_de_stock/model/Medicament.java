package com.gestion_de_stock.gestion_de_stock.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "medicaments")
@Data @AllArgsConstructor @NoArgsConstructor

public class Medicament {

    @Id
    private String id;
    private String name;
    private String presentation;
    private String dosage;
    private String status;
    private double PPV; // Prix de vente
    private double PH; //prix d'achat
    private String category;

    private Fournisseur fournisseur;


}

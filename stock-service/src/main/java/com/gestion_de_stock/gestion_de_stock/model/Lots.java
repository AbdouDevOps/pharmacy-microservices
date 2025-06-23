package com.gestion_de_stock.gestion_de_stock.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "lots")
@Data @AllArgsConstructor @NoArgsConstructor
public class Lots {

    @Id
    private String id;
    private String lotNumber;
    private int quantity;
    private LocalDate entryDate;
    private LocalDate expirationDate;

    private String medicamentId; // référence au médicament

}

package com.gestion_de_stock.gestion_de_stock.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;


@Document(collection = "historiques")
@Data @AllArgsConstructor @NoArgsConstructor

public class Historique {


    @Id
    private String id;
    private String name;
    private String quantity;
    private String price;
    private LocalDate date;


}

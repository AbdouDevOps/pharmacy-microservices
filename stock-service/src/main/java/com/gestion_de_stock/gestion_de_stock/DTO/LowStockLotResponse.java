package com.gestion_de_stock.gestion_de_stock.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data @AllArgsConstructor @NoArgsConstructor
public class LowStockLotResponse {

    private String name;              // nom du médicament
    private int quantity;             // quantité sur lot
    private LocalDate entryDate;
    private LocalDate expirationDate;
}

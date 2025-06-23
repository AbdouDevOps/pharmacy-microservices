package com.gestion_de_stock.gestion_de_stock.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data @AllArgsConstructor @NoArgsConstructor

public class InventoryDTO {

    private String name;
    private double PPV;
    private double PH;
    private int quantity;
    private LocalDate entryDate;
    private LocalDate expirationDate;

}

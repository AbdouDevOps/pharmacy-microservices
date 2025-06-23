package com.gestion_de_stock.gestion_de_stock.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor

public class AddMedicamentLotRequest {

    private String name;
    private int quantity;
    private LocalDate entryDate;
    private LocalDate expirationDate;
}

package com.gestion_de_stock.gestion_de_stock.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data @AllArgsConstructor @NoArgsConstructor

public class AchatRequestDTO {

    private List<MedicamentAchatDTO> medicaments;
}

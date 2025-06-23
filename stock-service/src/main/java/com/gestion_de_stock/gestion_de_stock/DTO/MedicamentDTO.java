package com.gestion_de_stock.gestion_de_stock.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data @AllArgsConstructor @NoArgsConstructor
public class MedicamentDTO {

    private String id;
    private String name;
    private String presentation;
    private String dosage;
    private String status;
    private double PPV;
    private double PH;
    private String category;


    private String fournisseurName;
    private String fournisseurPhone;
    private String fournisseurFax;
    private String fournisseurAddress;
    private String fournisseurWebsite;
    private String fournisseurStatus;

}
package com.gestion_de_stock.gestion_de_stock.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor

public class FournisseurDTO {

    private String fournisseusrName;
    private String fournisseurPhone;
    private String fournisseurFax;
    private String fournisseurAddress;
    private String fournisseurWebsite;
    private String fournisseurStatus;

}

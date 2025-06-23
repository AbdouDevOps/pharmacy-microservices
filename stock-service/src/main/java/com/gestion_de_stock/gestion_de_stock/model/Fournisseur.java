package com.gestion_de_stock.gestion_de_stock.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Data @AllArgsConstructor @NoArgsConstructor
public class Fournisseur {

    @Field("fournisseurName")
    private String name;

    @Field("fournisseurPhone")
    private String phone;

    @Field("fournisseurFax")
    private String fax;

    @Field("fournisseurAddress")
    private String address;

    @Field("fournisseurWebsite")
    private String website;

    @Field("fournisseurStatus")
    private String status;




}
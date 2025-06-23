package com.PharmaMaestro.models;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PharmacistAddress {

    private String houseNumber;
    private String street;
    private String apartment; 
}

package com.PharmaMaestro.dto;

import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class BadgeDTO {
    private String dateAssigned; // Date as String for easier JSON serialization
    private String imageBase64; // Image encodée en Base64, if needed

}

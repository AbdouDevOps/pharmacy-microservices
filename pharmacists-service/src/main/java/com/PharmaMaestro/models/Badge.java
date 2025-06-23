package com.PharmaMaestro.models;

import lombok.*;
import java.util.Date;


import org.springframework.data.annotation.Transient;

@Data
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Badge {

    private String badgeId;
    private String imageId; // référence vers l’image dans GridFS
    private Date dateAssigned;

    @Transient // Ne sera pas sauvegardé en base
    private String imageBase64; // Image encodée en Base64

}

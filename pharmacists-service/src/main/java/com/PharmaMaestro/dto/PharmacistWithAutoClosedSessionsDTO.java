package com.PharmaMaestro.dto;

import java.util.List;

import com.PharmaMaestro.models.Pharmacist;
import com.PharmaMaestro.models.Shift;

import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class PharmacistWithAutoClosedSessionsDTO {
    private String pharmacistId;
    private List<Shift> sessions;
    private int autoClosedSessionCount;
    private String firstName;
    private String lastName;
    private String userName ;
    private String phoneNumber;
    private Pharmacist.Post post ;

}

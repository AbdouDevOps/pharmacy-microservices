package com.PharmaMaestro.dto;

import java.util.List;

import com.PharmaMaestro.models.Pharmacist;
import com.PharmaMaestro.models.PharmacistAddress;
import com.PharmaMaestro.models.Shift;

import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class PharmacistDTO {
    private String firstName;
    private String lastName;
    private String userName;
    private String phoneNumber;
    private boolean active;
    private double salary;
    private Pharmacist.Post post;
    private BadgeDTO badge;
    private PharmacistAddress address;
    private List<Shift> sessions;
    private Boolean sessionStatus;

}

package com.PharmaMaestro.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "pharmacists")
public class Pharmacist {

    @Id
    private String id;

    private String firstName;
    private String lastName;
    private String userName;
    private String password;
    private String phoneNumber;
    private boolean active;
    private double salary;
    private Post post;

    private PharmacistAddress address;
    private List<Shift> sessions;

    public enum Post {
        Pharmacist,
        Pharmacist_Assistant,
        Head_Pharmacist
    }
    private Badge badge;
    private Boolean sessionStatus;
    
}

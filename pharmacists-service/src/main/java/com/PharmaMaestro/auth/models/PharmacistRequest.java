package com.PharmaMaestro.auth.models;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PharmacistRequest implements Serializable {
    private String userName;
    private String password;
}

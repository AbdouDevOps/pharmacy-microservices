package com.PharmaMaestro.auth.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.PharmaMaestro.models.Pharmacist;
import com.PharmaMaestro.auth.models.PharmacistDetails;

import java.util.Optional;

@Service
@Primary
public class PharmacistDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private com.PharmaMaestro.repository.PharmacistRepository PharmacistRepository;



    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        Optional<Pharmacist> admin = PharmacistRepository.findByUserName(userName);


        admin.orElseThrow(() -> new UsernameNotFoundException(userName + " ADMIN IS  not found."));

        return admin.map(PharmacistDetails::new).get();
    }

   
 // Lire un administrateur par ID
    public Optional<Pharmacist> getAdminById(String id) {
        return PharmacistRepository.findById(id);
    }

     // Mettre à jour un administrateur


        // Trouver un admin par nom d'utilisateur
        public Optional<Pharmacist> getAdminByUserName(String userName) {
            return PharmacistRepository.findByUserName(userName);
        }




     // Ajouter un nouvel admin
     public Pharmacist addAdmin(Pharmacist admin) {
        return PharmacistRepository.save(admin);
    }

}



package com.PharmaMaestro.auth.models;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.PharmaMaestro.models.Pharmacist;

import java.util.Collection;
import java.util.List;

public class PharmacistDetails implements UserDetails {
    private String userName;
    private String password;
    private boolean active;
    private List<GrantedAuthority> authorities;

    public PharmacistDetails(Pharmacist user) {
        this.userName = user.getUserName();
        this.password = user.getPassword();
        this.active = user.isActive();

    }
      
        @Override
        public boolean isAccountNonExpired() {
            return true;
        }
    
        @Override
        public boolean isAccountNonLocked() {
            return true;
        }
    
        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }
    
        @Override
        public boolean isEnabled() {
            return active;
        }
    

    
    public PharmacistDetails() {
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    


}

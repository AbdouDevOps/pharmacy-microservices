package com.PharmaMaestro.auth.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.stereotype.Service;

import com.PharmaMaestro.models.Pharmacist;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@Service
public class JwtUtil {
    String SECRET_KEY = "123456789flknerrkoerkermvenrveqjvpo2jrgpverlvknklernvmernvionewvnnvneoneonervoineovervnev0HelloWorld1234567890";
    public static final String ROLES = "ROLES";
    //Create JWT Token from MyUser Instance/ Data from DB



    public String generateJWTPharmacist(Optional<Pharmacist> user){
        //HashMap is a default requirement for making the claims in JSON type
        Map<String, Object> claims = new HashMap<>();
        claims.put(ROLES, user.get().getPost());//Adding roles to claims map
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.get().getUserName())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                //Set the expiration time to 8 hours from now
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 8))
                //.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }



    //Parse and get all claims, if parse is successful token is also ok and verified
    private Claims extractAllClaims(String jwtToken){
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(jwtToken).getBody();
    }
    
    
    
    
    //Get a single claim from all claims
    private <T> T extractOneClaim(String jwtToken, Function<Claims, T> claimsResolver){
        Claims claims = extractAllClaims(jwtToken);
        return claimsResolver.apply(claims);
    }
    
    
    
    
    //Get username from token
    public String extractUserName(String jwtToken){
        return extractOneClaim(jwtToken, Claims::getSubject);

    }
    //Get single role from token
    public String extractRoles(String jwtToken){
        return extractOneClaim(jwtToken, claims -> (String) claims.get(ROLES));

    }
   

    //Get the expiration time
    public Date extractExpiration(String jwtToken){
        return extractOneClaim(jwtToken, Claims::getExpiration);

    }
    //Check if expired or not
    public boolean isJwtExpired(String jwtToken){
        final Date expiration = extractExpiration(jwtToken);
        return expiration.before(new Date());
    }
        // méthode pour forcer l'expiration
    public void invalidateToken(String jwtToken) {
        Claims claims = extractAllClaims(jwtToken);
        claims.setExpiration(new Date()); // Met la date d'expiration à maintenant
    }


        public boolean isTokenExpired(String token) {
        final Date expiration = extractExpiration(token);
        return expiration.before(new Date());
    }


}


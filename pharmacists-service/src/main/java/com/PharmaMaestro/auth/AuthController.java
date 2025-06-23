package com.PharmaMaestro.auth;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.web.bind.annotation.*;

import com.PharmaMaestro.models.Pharmacist;
import com.PharmaMaestro.repository.PharmacistRepository;
import com.PharmaMaestro.auth.models.PharmacistRequest;
import com.PharmaMaestro.auth.services.PharmacistDetailsServiceImpl;
import com.PharmaMaestro.auth.utils.JwtUtil;



@RestController
public class AuthController {
    //@Autowired
   // private JwtUtil jwtUtil;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    AuthenticationManager authenticationManagerr;
    @Autowired
    private PharmacistRepository adminDetailsRepository;

    @Autowired
    private PharmacistDetailsServiceImpl adminService;

    @Autowired
    private JwtUtil jwtUtils;

    @PostMapping("/adda")
    public ResponseEntity<Pharmacist> addAdmin(@RequestBody Pharmacist admin) {
        Pharmacist newAdmin = adminService.addAdmin(admin);
        return ResponseEntity.ok(newAdmin);
    }



     
    @PostMapping("/logina")
    public ResponseEntity<?> authenticateAndGetJWT(@RequestBody PharmacistRequest authRequest) throws Exception {
    String url = "jdbc:mysql://localhost:3306/jee_gestion_residences";
    String user = "root";
    String password = "aK4nnL7C53BDcIKp";

    try (Connection connection = DriverManager.getConnection(url, user, password)) {
        String email = authRequest.getUserName();
        String passwordd = authRequest.getPassword();

        String sql = "SELECT * FROM admin WHERE user_name = ? AND password = ?";

        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, email);
            stmt.setString(2, passwordd);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                // Utilisateur authentifié, préparer un objet utilisateur
                Pharmacist userFromDB = new Pharmacist();
                userFromDB.setUserName(rs.getString("user_name"));

                // Générer le JWT
                JwtUtil jwtUtil = new JwtUtil();
                String jwtToken = jwtUtil.generateJWTPharmacist(Optional.of(userFromDB));

                // Retourner le JWT à l'utilisateur
                Map<String, String> response = new HashMap<>();
                response.put("token", jwtToken);
                response.put("message", "Authentication successful");
              
            
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        }
    } catch (SQLException e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error");
    }
}






}

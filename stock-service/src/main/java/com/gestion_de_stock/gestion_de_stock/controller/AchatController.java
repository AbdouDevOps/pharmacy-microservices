package com.gestion_de_stock.gestion_de_stock.controller;

import com.gestion_de_stock.gestion_de_stock.DTO.AchatRequestDTO;
import com.gestion_de_stock.gestion_de_stock.service.interfac.MedicamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/medicaments/achat")
public class AchatController {

    private final MedicamentService medicamentService;

    @Autowired
    public AchatController(MedicamentService medicamentService) {
        this.medicamentService = medicamentService;
    }

    /**
     * Endpoint pour traiter un panier d'achat (un ou plusieurs médicaments).
     * Exemple d'appel : POST /api/achat
     */
    @PostMapping // effectuer un achat pour modifier la quantiter sur le stock et transferer les donnees a un autre service qui va generer une facturation
    public ResponseEntity<String> acheterMedicaments(@RequestBody AchatRequestDTO request) {
        boolean success = medicamentService.processAchat(request);

        if (success) {
            return ResponseEntity.ok("Achat effectué avec succès.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Achat échoué : stock insuffisant ou erreur.");
        }
    }
}

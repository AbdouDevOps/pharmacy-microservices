package com.gestion_de_stock.gestion_de_stock.controller;

import com.gestion_de_stock.gestion_de_stock.DTO.InventoryDTO;
import com.gestion_de_stock.gestion_de_stock.DTO.MedicamentDTO;
import com.gestion_de_stock.gestion_de_stock.model.Medicament;
import com.gestion_de_stock.gestion_de_stock.service.interfac.MedicamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicaments")
@RequiredArgsConstructor
public class MedicamentController {

    private final MedicamentService medicamentService;


    @GetMapping("/get-medicament/{id}") // detail d'un medicament
    public ResponseEntity<MedicamentDTO> getMedicamentById(@PathVariable String id) {
        MedicamentDTO medicament = medicamentService.getMedicamentById(id);
        return ResponseEntity.ok(medicament);
    }

    @GetMapping("/{category}") // get medicament par categorie
    public List<Medicament> getMedicaments(@PathVariable(required = false) String category) {
        return (category == null)
                ? medicamentService.getAllMedicaments()
                : medicamentService.getMedicamentsByCategory(category);
    }

    @GetMapping("/medicament-inventory") // get medicament qui se trouve sur les lots
    public ResponseEntity<List<InventoryDTO>> getMedicamentsInLots() {
        List<InventoryDTO> inventoryList = medicamentService.getAllMedicamentsExistInLot();
        return ResponseEntity.ok(inventoryList);
    }






}

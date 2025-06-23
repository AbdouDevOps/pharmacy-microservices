package com.gestion_de_stock.gestion_de_stock.controller;

import com.gestion_de_stock.gestion_de_stock.DTO.AddMedicamentLotRequest;
import com.gestion_de_stock.gestion_de_stock.DTO.LowStockLotResponse;
import com.gestion_de_stock.gestion_de_stock.DTO.UpdateLotQuantityRequest;
import com.gestion_de_stock.gestion_de_stock.service.interfac.LotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Month;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/medicaments/lots")
@RequiredArgsConstructor
public class LotController {

    private final LotService lotService;


    /** Compter les médicaments entrés sur un mois donné (yyyy, mm) */
    @GetMapping("/stats/entries/{year}/{month}")
    public ResponseEntity<Long> countMedicamentsEnteredPerMonth(@PathVariable int year, @PathVariable int month) {
        Long count = lotService.countMedicamentsEnteredPerMonth(year, month);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/stats/entries") // get le nombre de medicament entrer sur les lots par mois
    public ResponseEntity<Map<String, Integer>> countMedicamentsEnteredPerMonth() {
        Map<Month, Integer> result = lotService.countMedicamentsEnteredPerMonth();

        // Convert Month enums to String for JSON serialization
        Map<String, Integer> response = result.entrySet().stream()
                .collect(Collectors.toMap(
                        entry -> entry.getKey().name(), // convert Month to "JANUARY", "FEBRUARY", etc.
                        Map.Entry::getValue
                ));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-medicament-in-lot") // ajouter medicament dans un lot
    public ResponseEntity<String> addMedicament(@RequestBody AddMedicamentLotRequest request) {
        lotService.addMedicament(request);
        return ResponseEntity.ok("Médicament ajouté avec succès.");
    }

    @PostMapping("/update-quantity") // diminuer la quantiter d'un medicament qui existe sur les lots si un achat est fait
    public ResponseEntity<String> updateLotQuantity(@RequestBody UpdateLotQuantityRequest request) {
        lotService.updateLotQuantity(request.getMedicamentId(), request.getQuantityToRemove());
        return ResponseEntity.ok("Quantité mise à jour avec succès.");
    }




    @GetMapping("/alert/low-stock") // get les medicaments qui ont la quantiter <= 10
    public ResponseEntity<List<LowStockLotResponse>> getLowStockLots() {
        List<LowStockLotResponse> lowStockLots = lotService.alertLowStockMedicament();
        return ResponseEntity.ok(lowStockLots);
    }

    @GetMapping("/alert/critical-low-stock")
    public ResponseEntity<List<LowStockLotResponse>> getCriticalLowStockLots() {
        List<LowStockLotResponse> lowStockLots = lotService.alertCriticalStockMedicament();
        return ResponseEntity.ok(lowStockLots);
    }

}

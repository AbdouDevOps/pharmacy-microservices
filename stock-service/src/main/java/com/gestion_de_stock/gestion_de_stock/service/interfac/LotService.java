package com.gestion_de_stock.gestion_de_stock.service.interfac;


import com.gestion_de_stock.gestion_de_stock.DTO.AddMedicamentLotRequest;
import com.gestion_de_stock.gestion_de_stock.DTO.LowStockLotResponse;
import com.gestion_de_stock.gestion_de_stock.DTO.MedicamentDTO;
import com.gestion_de_stock.gestion_de_stock.model.Medicament;

import java.time.LocalDate;
import java.time.Month;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface LotService {

    public void addMedicament(AddMedicamentLotRequest request);
    public Map<Month, Integer> countMedicamentsEnteredPerMonth();
    public Long countMedicamentsEnteredPerMonth(int year, int month);
    public void updateLotQuantity(String medicamentId, int quantityToRemove);
    public List<LowStockLotResponse> alertLowStockMedicament();
    public List<LowStockLotResponse> alertCriticalStockMedicament();





}

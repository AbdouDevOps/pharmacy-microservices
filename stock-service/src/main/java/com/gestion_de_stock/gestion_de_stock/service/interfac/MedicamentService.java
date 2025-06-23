package com.gestion_de_stock.gestion_de_stock.service.interfac;

import com.gestion_de_stock.gestion_de_stock.DTO.AchatRequestDTO;
import com.gestion_de_stock.gestion_de_stock.DTO.InventoryDTO;
import com.gestion_de_stock.gestion_de_stock.DTO.MedicamentDTO;
import com.gestion_de_stock.gestion_de_stock.model.Medicament;

import java.util.List;

public interface MedicamentService {


    public MedicamentDTO getMedicamentById(String id);
    public List<Medicament> getAllMedicaments();
    public List<Medicament> getMedicamentsByCategory(String category);
    public List<InventoryDTO> getAllMedicamentsExistInLot();
    public boolean processAchat(AchatRequestDTO request);








}



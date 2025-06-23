package com.gestion_de_stock.gestion_de_stock.service.implementation;

import com.gestion_de_stock.gestion_de_stock.DTO.*;
import com.gestion_de_stock.gestion_de_stock.mapper.MedicamentMapper;
import com.gestion_de_stock.gestion_de_stock.model.Historique;
import com.gestion_de_stock.gestion_de_stock.model.Lots;
import com.gestion_de_stock.gestion_de_stock.model.Medicament;
import com.gestion_de_stock.gestion_de_stock.repository.HistoriqueRepository;
import com.gestion_de_stock.gestion_de_stock.repository.LotsRepository;
import com.gestion_de_stock.gestion_de_stock.repository.MedicamentRepository;
import com.gestion_de_stock.gestion_de_stock.service.interfac.MedicamentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MedicamentServiceImpl implements MedicamentService {

    @Autowired
    private MedicamentRepository medicamentRepository;

    @Autowired
    private LotsRepository lotsRepository;

    @Autowired
    private MedicamentMapper medicamentMapper;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private HistoriqueRepository historiqueRepository;




    public MedicamentDTO getMedicamentByName(String name) {
        Medicament medicament = medicamentRepository.findFirstByName(name)
                .orElseThrow(() -> new RuntimeException("Médicament non trouvé"));
        return medicamentMapper.toDTO(medicament);
    }

    public MedicamentDTO getMedicamentById(String id) {
        Medicament medicament = medicamentRepository.findFirstById(id)
                .orElseThrow(() -> new RuntimeException("Médicament non trouvé"));
        System.out.println("Fournisseur: " + medicament.getFournisseur());
        if (medicament.getFournisseur() != null) {
            System.out.println("Nom fournisseur: " + medicament.getFournisseur().getName());
        }
        return medicamentMapper.toDTO(medicament);
    }


    public List<Medicament> getAllMedicaments() {
        return medicamentRepository.findAll();
    }



    public List<Medicament> getMedicamentsByCategory(String category) {
        List<Medicament> medicament = medicamentRepository.findByCategory(category);
        return medicamentMapper.toDTO(medicament);

    }

    @Override
    public List<InventoryDTO> getAllMedicamentsExistInLot() {
        List<Lots> lots = lotsRepository.findAll();

        return lots.stream()
                .map(lot -> {
                    Optional<Medicament> medicamentOpt = medicamentRepository.findById(lot.getMedicamentId());
                    if (medicamentOpt.isPresent()) {
                        Medicament medicament = medicamentOpt.get();
                        InventoryDTO dto = new InventoryDTO();
                        dto.setName(medicament.getName());
                        dto.setPPV(medicament.getPPV());
                        dto.setPH(medicament.getPH());
                        dto.setQuantity(lot.getQuantity());
                        dto.setEntryDate(lot.getEntryDate());
                        dto.setExpirationDate(lot.getExpirationDate());
                        return dto;
                    } else {
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    @Override
    public boolean processAchat(AchatRequestDTO request) {
        for (MedicamentAchatDTO item : request.getMedicaments()) {
            List<Lots> lots = lotsRepository.findByMedicamentId(item.getMedicamentId());

            int totalStock = lots.stream()
                    .mapToInt(Lots::getQuantity)
                    .sum();

            if (totalStock < item.getRequestedQuantity()) {
                return false; // Stock insuffisant
            }

            // Appel à l'endpoint pour modifier les quantités
            String updateUrl = "http://localhost:8080/api/lots/update-quantity";

            UpdateLotQuantityRequest updateRequest = new UpdateLotQuantityRequest(
                    item.getMedicamentId(),
                    item.getRequestedQuantity()
            );

            try {
                restTemplate.postForEntity(updateUrl, updateRequest, String.class);
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }

            // Récupération du médicament pour enregistrer dans l'historique
            Medicament medicament = medicamentRepository.findById(item.getMedicamentId()).orElse(null);
            if (medicament == null) continue;

            Historique historique = new Historique();
            historique.setName(medicament.getName());
            historique.setQuantity(String.valueOf(item.getRequestedQuantity()));
            historique.setPrice(String.valueOf(medicament.getPPV()));
            historique.setDate(LocalDate.now());

            historiqueRepository.save(historique);
        }

        return true;
    }





}

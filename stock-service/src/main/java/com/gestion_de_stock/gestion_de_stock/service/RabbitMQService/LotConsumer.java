package com.gestion_de_stock.gestion_de_stock.service.RabbitMQService;

import com.gestion_de_stock.gestion_de_stock.DTO.AddMedicamentLotRequest;
import com.gestion_de_stock.gestion_de_stock.DTO.MedicamentDTO;
import com.gestion_de_stock.gestion_de_stock.DTO.UpdateLotQuantityRequest;
import com.gestion_de_stock.gestion_de_stock.configuration.RabbitMQConfig;
import com.gestion_de_stock.gestion_de_stock.mapper.LotMapperImpl;
import com.gestion_de_stock.gestion_de_stock.model.Lots;
import com.gestion_de_stock.gestion_de_stock.repository.LotsRepository;
import com.gestion_de_stock.gestion_de_stock.service.implementation.MedicamentServiceImpl;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LotConsumer {

    private final LotsRepository lotsRepository;
    private final MedicamentServiceImpl medicamentServiceImpl;
    private final LotMapperImpl lotMapperImpl;

    public LotConsumer(LotsRepository lotsRepository, MedicamentServiceImpl medicamentServiceImpl, LotMapperImpl lotMapperImpl) {
        this.lotsRepository = lotsRepository;
        this.medicamentServiceImpl = medicamentServiceImpl;
        this.lotMapperImpl = lotMapperImpl;
    }

    @RabbitListener(queues = RabbitMQConfig.ADD_MEDICAMENT_QUEUE)
    public void handleAddMedicament(AddMedicamentLotRequest request) {

        // Obtenir l'entité médicament
        MedicamentDTO medicament = medicamentServiceImpl.getMedicamentByName(request.getName());

        // Mapper le DTO vers l'entité Lots
//        Lots lot = lotMapper.toEntity(request);
        Lots lot = lotMapperImpl.toEntity(request);
        lot.setId(UUID.randomUUID().toString());

        // Générer un lotNumber basé sur le nom du médicament + un identifiant
        String baseName = medicament.getName().toLowerCase().replaceAll("\\s+", ""); // ex: "Doliprane" -> "doliprane"
        String lotNumber = baseName.substring(0, Math.min(baseName.length(), 4)) + "_" + medicament.getId().substring(0, 4);
        lot.setLotNumber(lotNumber);

        // Lier le médicament
        lot.setMedicamentId(medicament.getId());

        // Sauvegarde
        lotsRepository.save(lot);
    }

    @RabbitListener(queues = RabbitMQConfig.UPDATE_QUANTITY_QUEUE)
    public void handleUpdateQuantity(UpdateLotQuantityRequest request) {

        if (request.getQuantityToRemove() <= 0) {
            throw new IllegalArgumentException("La quantité à retirer doit être > 0");
        }

        // 1. Récupérer les lots du médicament (triés par date d’entrée pour FIFO)
        List<Lots> lots = lotsRepository.findByMedicamentIdOrderByEntryDateAsc(request.getMedicamentId());

        int totalAvailable = lots.stream().mapToInt(Lots::getQuantity).sum();

        if (totalAvailable < request.getQuantityToRemove()) {
            throw new IllegalArgumentException("Stock insuffisant pour retirer cette quantité.");
        }

        // 2. Réduire progressivement les quantités
        int remainingToRemove = request.getQuantityToRemove();

        for (Lots lot : lots) {
            if (remainingToRemove == 0) break;

            int available = lot.getQuantity();

            if (available >= remainingToRemove) {
                lot.setQuantity(available - remainingToRemove);
                remainingToRemove = 0;
            } else {
                lot.setQuantity(0);
                remainingToRemove -= available;
            }
        }

        // 3. Sauvegarder les modifications
        lotsRepository.saveAll(lots);

    }
}

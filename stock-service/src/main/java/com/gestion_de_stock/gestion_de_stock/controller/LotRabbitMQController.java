package com.gestion_de_stock.gestion_de_stock.controller;

import com.gestion_de_stock.gestion_de_stock.DTO.AddMedicamentLotRequest;
import com.gestion_de_stock.gestion_de_stock.DTO.UpdateLotQuantityRequest;
import com.gestion_de_stock.gestion_de_stock.configuration.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lots/broker")
public class LotRabbitMQController {

    private final RabbitTemplate rabbitTemplate;

    public LotRabbitMQController(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @PostMapping("/add-medicament-in-lot")
    public ResponseEntity<String> addLot(@RequestBody AddMedicamentLotRequest request) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.ADD_MEDICAMENT_QUEUE, request);
        return ResponseEntity.accepted().body("Ajout du lot en cours");
    }

    @PostMapping("/update-quantity")
    public ResponseEntity<String> updateLotQuantity(@RequestBody UpdateLotQuantityRequest request) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.UPDATE_QUANTITY_QUEUE, request);
        return ResponseEntity.accepted().body("Mise à jour du lot en cours");
    }

}

package com.PharmaMaestro.configuration;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQMessageProducer {

    private final RabbitTemplate rabbitTemplate;

    public RabbitMQMessageProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendMessage(String message) {
        rabbitTemplate.convertAndSend(
            RabbitMQConfig.EXCHANGE,
            RabbitMQConfig.ROUTING_KEY,
            message
        );
        System.out.println("Message envoyé : " + message);
    }
}

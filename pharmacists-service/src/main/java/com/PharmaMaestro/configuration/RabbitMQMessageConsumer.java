package com.PharmaMaestro.configuration;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQMessageConsumer {

    @RabbitListener(queues = RabbitMQConfig.QUEUE)
    public void listen(String message) {
        System.out.println("Message reçu : " + message);
        // 👉 ici tu peux insérer le message dans MongoDB si tu veux
    }
}

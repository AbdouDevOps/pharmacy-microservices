package com.gestion_de_stock.gestion_de_stock.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String ADD_MEDICAMENT_QUEUE = "add.medicament.lot.queue";
    public static final String UPDATE_QUANTITY_QUEUE = "update.quantity.queue";

    @Bean
    public Queue addMedicamentQueue() {
        return new Queue(ADD_MEDICAMENT_QUEUE, false);
    }

    @Bean
    public Queue updateQuantityQueue() {
        return new Queue(UPDATE_QUANTITY_QUEUE, false);
    }

    // 👇 Ce bean est essentiel pour que RabbitTemplate convertisse en JSON
    @Bean
    public MessageConverter jsonMessageConverter() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return new Jackson2JsonMessageConverter(mapper);
    }


    // 👇 On injecte le converter dans RabbitTemplate
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(jsonMessageConverter());
        return template;
    }

}

package com.PharmaMaestro.configuration;

import java.lang.reflect.Constructor;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String QUEUE = "pharma.orders";
    public static final String EXCHANGE = "my_exchange";
    public static final String ROUTING_KEY = "my_routingKey";



    @Bean
    public Queue queue() {
        return new Queue("pharma.orders", true); // true = durable
    }

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange("pharma.exchange");
    }

    @Bean
    public Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue)
                           .to(exchange)
                           .with("pharma.routing.key");
    }
    
}

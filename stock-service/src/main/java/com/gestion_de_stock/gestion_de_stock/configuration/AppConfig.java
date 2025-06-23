package com.gestion_de_stock.gestion_de_stock.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class AppConfig {

    // On l'utilise pour appeler un endpoint interne
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

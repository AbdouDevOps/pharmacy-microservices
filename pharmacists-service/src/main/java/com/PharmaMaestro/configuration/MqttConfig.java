package com.PharmaMaestro.configuration;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.core.MessageProducer;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;

@Configuration
public class MqttConfig {

    private final MqttProperties mqttProperties;

    public MqttConfig(MqttProperties mqttProperties) {
        this.mqttProperties = mqttProperties;
    }

    @Bean
    public MqttPahoClientFactory mqttClientFactory() {
        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
        MqttConnectOptions options = new MqttConnectOptions();
        options.setServerURIs(new String[]{mqttProperties.getBrokerUrl()});
        options.setKeepAliveInterval(60);
        options.setAutomaticReconnect(true);
        options.setCleanSession(true);

        factory.setConnectionOptions(options);
        return factory;
    }

    @Bean
    public MessageChannel mqttInputChannel() {
        return new DirectChannel();
    }

    @Bean
    public MessageProducer inbound() {
        MqttPahoMessageDrivenChannelAdapter adapter = 
            new MqttPahoMessageDrivenChannelAdapter(
                mqttProperties.getClientId(), 
                mqttClientFactory(), 
                mqttProperties.getTopic()
            );
        adapter.setOutputChannel(mqttInputChannel());
        adapter.setQos(1);
        return adapter;
    }

@Bean
@ServiceActivator(inputChannel = "mqttInputChannel")
public MessageHandler handler(MqttMessageHandlerService messageHandlerService) {
    return message -> {
        String payload = message.getPayload().toString();
        System.out.println("Message brut reçu: " + payload);

        messageHandlerService.handleMessage(payload);
    };
}


    private String extractUidFromPayload(String payload) {
        // Format attendu: "rfid scan = UID : 235CDDAA" ou similaire
        if (payload == null || payload.isEmpty()) {
            return "";
        }
        
        // Supprime les espaces excédentaires et split
        String[] parts = payload.trim().split("\\s+");
        
        // Trouve la partie après "UID :"
        for (int i = 0; i < parts.length; i++) {
            if (parts[i].equalsIgnoreCase("UID") && i + 1 < parts.length && parts[i+1].equals(":")) {
                return i + 2 < parts.length ? parts[i+2] : "";
            } else if (parts[i].equalsIgnoreCase("UID:") && i + 1 < parts.length) {
                return parts[i+1];
            }
        }
        
        // Si le format n'est pas reconnu, retourne tout le message
        return payload;
    }
}
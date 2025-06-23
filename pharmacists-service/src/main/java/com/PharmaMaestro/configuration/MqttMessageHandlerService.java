package com.PharmaMaestro.configuration;

import com.PharmaMaestro.service.ShiftService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MqttMessageHandlerService {

    private final ShiftService shiftService;

    public void handleMessage(String payload) {
        String uid = extractUidFromPayload(payload);
        System.out.println("UID extrait: " + uid);

        if (!uid.isEmpty()) {
            String result = shiftService.handleBadgeScan(uid  );
            System.out.println("Résultat du traitement : " + result);
        } else {
            System.out.println("UID invalide.");
        }
    }

    private String extractUidFromPayload(String payload) {
        if (payload == null || payload.isEmpty()) {
            return "";
        }

        String[] parts = payload.trim().split("\\s+");
        for (int i = 0; i < parts.length; i++) {
            if (parts[i].equalsIgnoreCase("UID") && i + 1 < parts.length && parts[i + 1].equals(":")) {
                return i + 2 < parts.length ? parts[i + 2] : "";
            } else if (parts[i].equalsIgnoreCase("UID:") && i + 1 < parts.length) {
                return parts[i + 1];
            }
        }

        return "";
    }
}

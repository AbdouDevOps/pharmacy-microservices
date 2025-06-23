package com.PharmaMaestro.models;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "shift")

public class Shift {

    @Id
    private String sessionId;

    private LocalDate sessionDate;
    private LocalTime entryTime;
    private LocalTime exitTime;
    private String pharmacistId;
    private ShiftStatus status ;


    public enum ShiftStatus {
    OPEN, CLOSED, AUTO_CLOSED
}

}

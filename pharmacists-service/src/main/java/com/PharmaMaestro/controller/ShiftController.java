package com.PharmaMaestro.controller;

import com.PharmaMaestro.service.ShiftService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shift")
@RequiredArgsConstructor
public class ShiftController {

    private final ShiftService shiftService;

    @PostMapping("/scan/{badgeId}")
    public ResponseEntity<String> scanBadge(@PathVariable String badgeId) {
        String result = shiftService.handleBadgeScan(badgeId);
        return ResponseEntity.ok(result);
    }
}

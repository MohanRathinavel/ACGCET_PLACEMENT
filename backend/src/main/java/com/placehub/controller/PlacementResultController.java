package com.placehub.controller;

import com.placehub.dto.request.PlacementResultRequest;
import com.placehub.dto.response.ApiResponse;
import com.placehub.entity.PlacementResult;
import com.placehub.service.PlacementResultService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class PlacementResultController {

    private final PlacementResultService placementResultService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<PlacementResult>> addResult(
            @Valid @RequestBody PlacementResultRequest request) {
        PlacementResult result = placementResultService.addResult(request);
        return ResponseEntity.ok(ApiResponse.success("Placement result added", result));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<PlacementResult>>> getAllResults() {
        return ResponseEntity.ok(
                ApiResponse.success("Results fetched", placementResultService.getAllResults()));
    }

    @GetMapping("/student/{registerNumber}")
    public ResponseEntity<ApiResponse<PlacementResult>> getResultByStudent(
            @PathVariable String registerNumber) {
        PlacementResult result = placementResultService.getResultByRegisterNumber(registerNumber);
        return ResponseEntity.ok(ApiResponse.success("Result fetched", result));
    }
}

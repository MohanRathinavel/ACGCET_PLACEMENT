package com.placehub.controller;

import com.placehub.dto.request.ApplicationStatusRequest;
import com.placehub.dto.response.ApiResponse;
import com.placehub.entity.PlacementApplication;
import com.placehub.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/apply/{companyId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<PlacementApplication>> apply(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long companyId) {
        PlacementApplication application =
                applicationService.applyToCompany(userDetails.getUsername(), companyId);
        return ResponseEntity.ok(ApiResponse.success("Application submitted", application));
    }

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<List<PlacementApplication>>> getMyApplications(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<PlacementApplication> apps =
                applicationService.getApplicationsByStudent(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Applications fetched", apps));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<PlacementApplication>>> getAllApplications() {
        return ResponseEntity.ok(
                ApiResponse.success("All applications fetched",
                        applicationService.getAllApplications()));
    }

    @PutMapping("/{applicationId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<PlacementApplication>> updateStatus(
            @PathVariable Long applicationId,
            @Valid @RequestBody ApplicationStatusRequest request) {
        PlacementApplication updated =
                applicationService.updateApplicationStatus(applicationId, request);
        return ResponseEntity.ok(ApiResponse.success("Status updated", updated));
    }
}

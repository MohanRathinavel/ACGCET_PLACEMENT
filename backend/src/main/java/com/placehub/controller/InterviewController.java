package com.placehub.controller;

import com.placehub.dto.request.InterviewRequest;
import com.placehub.dto.response.ApiResponse;
import com.placehub.entity.InterviewSchedule;
import com.placehub.service.InterviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class InterviewController {

    private final InterviewService interviewService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<InterviewSchedule>> schedule(
            @Valid @RequestBody InterviewRequest request) {
        InterviewSchedule interview = interviewService.scheduleInterview(request);
        return ResponseEntity.ok(ApiResponse.success("Interview scheduled", interview));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<InterviewSchedule>>> getAllInterviews() {
        return ResponseEntity.ok(
                ApiResponse.success("Interviews fetched", interviewService.getAllInterviews()));
    }

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<List<InterviewSchedule>>> getMyInterviews(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<InterviewSchedule> interviews =
                interviewService.getInterviewsByStudent(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Interviews fetched", interviews));
    }

    @PutMapping("/{interviewId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<InterviewSchedule>> updateInterview(
            @PathVariable Long interviewId,
            @Valid @RequestBody InterviewRequest request) {
        InterviewSchedule updated = interviewService.updateInterview(interviewId, request);
        return ResponseEntity.ok(ApiResponse.success("Interview updated", updated));
    }

    @DeleteMapping("/{interviewId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteInterview(
            @PathVariable Long interviewId) {
        interviewService.deleteInterview(interviewId);
        return ResponseEntity.ok(ApiResponse.success("Interview deleted", null));
    }
}

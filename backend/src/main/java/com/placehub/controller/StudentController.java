package com.placehub.controller;

import com.placehub.dto.request.StudentUpdateRequest;
import com.placehub.dto.response.ApiResponse;
import com.placehub.entity.Company;
import com.placehub.entity.InterviewSchedule;
import com.placehub.entity.Notification;
import com.placehub.entity.PlacementApplication;
import com.placehub.entity.Student;
import com.placehub.service.ApplicationService;
import com.placehub.service.CompanyService;
import com.placehub.service.InterviewService;
import com.placehub.service.NotificationService;
import com.placehub.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/students")
@PreAuthorize("hasRole('STUDENT')")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class StudentController {

    private final StudentService studentService;
    private final CompanyService companyService;
    private final ApplicationService applicationService;
    private final InterviewService interviewService;
    private final NotificationService notificationService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<Student>> getProfile(
            @AuthenticationPrincipal UserDetails userDetails) {
        Student student = studentService.getProfileByUsername(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Profile fetched", student));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<Student>> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody StudentUpdateRequest request) {
        Student updated = studentService.updateProfile(userDetails.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated", updated));
    }

    @PostMapping("/resume/upload")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadResume(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam("file") MultipartFile file) {
        String url = studentService.uploadResume(userDetails.getUsername(), file);
        return ResponseEntity.ok(ApiResponse.success("Resume uploaded", Map.of("url", url)));
    }

    @PostMapping("/profile-image/upload")
    public ResponseEntity<ApiResponse<Map<String, String>>> uploadProfileImage(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam("file") MultipartFile file) {
        String url = studentService.uploadProfileImage(userDetails.getUsername(), file);
        return ResponseEntity.ok(ApiResponse.success("Profile image uploaded", Map.of("url", url)));
    }

    // ---- Convenience delegate endpoints (spec-required paths under /api/students) ----

    @GetMapping("/companies")
    public ResponseEntity<ApiResponse<List<Company>>> getAvailableCompanies() {
        return ResponseEntity.ok(
                ApiResponse.success("Companies fetched", companyService.getAllCompanies()));
    }

    @PostMapping("/apply/{companyId}")
    public ResponseEntity<ApiResponse<PlacementApplication>> applyToCompany(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long companyId) {
        PlacementApplication application =
                applicationService.applyToCompany(userDetails.getUsername(), companyId);
        return ResponseEntity.ok(ApiResponse.success("Application submitted", application));
    }

    @GetMapping("/applications")
    public ResponseEntity<ApiResponse<List<PlacementApplication>>> getMyApplications(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<PlacementApplication> apps =
                applicationService.getApplicationsByStudent(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Applications fetched", apps));
    }

    @GetMapping("/interviews")
    public ResponseEntity<ApiResponse<List<InterviewSchedule>>> getMyInterviews(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<InterviewSchedule> interviews =
                interviewService.getInterviewsByStudent(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Interviews fetched", interviews));
    }

    @GetMapping("/notifications")
    public ResponseEntity<ApiResponse<List<Notification>>> getMyNotifications(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<Notification> notifications =
                notificationService.getNotificationsForStudent(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Notifications fetched", notifications));
    }
}

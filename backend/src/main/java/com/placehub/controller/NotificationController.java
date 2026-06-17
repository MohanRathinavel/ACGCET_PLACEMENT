package com.placehub.controller;

import com.placehub.dto.request.NotificationRequest;
import com.placehub.dto.response.ApiResponse;
import com.placehub.entity.Notification;
import com.placehub.service.NotificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Notification>> sendNotification(
            @Valid @RequestBody NotificationRequest request) {
        Notification notification = notificationService.sendNotification(request);
        return ResponseEntity.ok(ApiResponse.success("Notification sent", notification));
    }

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<List<Notification>>> getStudentNotifications(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<Notification> notifications =
                notificationService.getNotificationsForStudent(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Notifications fetched", notifications));
    }

    @PutMapping("/{notificationId}/read")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<ApiResponse<Notification>> markAsRead(
            @PathVariable Long notificationId) {
        Notification notification = notificationService.markAsRead(notificationId);
        return ResponseEntity.ok(ApiResponse.success("Notification marked as read", notification));
    }
}

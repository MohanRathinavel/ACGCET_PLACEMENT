package com.placehub.controller;

import com.placehub.dto.request.LoginRequest;
import com.placehub.dto.request.StudentSignupRequest;
import com.placehub.dto.response.ApiResponse;
import com.placehub.dto.response.AuthResponse;
import com.placehub.entity.User;
import com.placehub.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/student/signup")
    public ResponseEntity<ApiResponse<AuthResponse>> studentSignup(
            @Valid @RequestBody StudentSignupRequest request) {
        AuthResponse response = authService.studentSignup(request);
        return ResponseEntity.ok(ApiResponse.success("Signup successful", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<User>> getCurrentUser(
            @AuthenticationPrincipal UserDetails userDetails) {
        User user = authService.getCurrentUser(userDetails.getUsername());
        // Don't expose password
        user.setPassword(null);
        return ResponseEntity.ok(ApiResponse.success("Current user fetched", user));
    }
}

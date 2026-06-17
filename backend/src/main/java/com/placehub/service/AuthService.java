package com.placehub.service;

import com.placehub.dto.request.LoginRequest;
import com.placehub.dto.request.StudentSignupRequest;
import com.placehub.dto.response.AuthResponse;
import com.placehub.entity.User;

public interface AuthService {
    AuthResponse login(LoginRequest request);
    AuthResponse studentSignup(StudentSignupRequest request);
    User getCurrentUser(String username);
}

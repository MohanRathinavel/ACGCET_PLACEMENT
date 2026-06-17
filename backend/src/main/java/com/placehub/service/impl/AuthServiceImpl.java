package com.placehub.service.impl;

import com.placehub.dto.request.LoginRequest;
import com.placehub.dto.request.StudentSignupRequest;
import com.placehub.dto.response.AuthResponse;
import com.placehub.entity.Student;
import com.placehub.entity.User;
import com.placehub.enums.Role;
import com.placehub.exception.ResourceNotFoundException;
import com.placehub.repository.StudentRepository;
import com.placehub.repository.UserRepository;
import com.placehub.security.CustomUserDetailsService;
import com.placehub.service.AuthService;
import com.placehub.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    @Override
    public AuthResponse login(LoginRequest request) {
        // Check if user exists
        userRepository.findByUsernameOrEmail(request.getUsernameOrEmail(), request.getUsernameOrEmail())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found. Please signup."));

        // Authenticate credentials
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsernameOrEmail(),
                            request.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Invalid password. Please try again.");
        }

        // Generate JWT
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsernameOrEmail());
        String token = jwtUtil.generateToken(userDetails);

        User user = userRepository.findByUsernameOrEmail(
                request.getUsernameOrEmail(), request.getUsernameOrEmail()).get();

        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .message("Login successful")
                .build();
    }

    @Override
    @Transactional
    public AuthResponse studentSignup(StudentSignupRequest request) {
        // Check uniqueness
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken.");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered.");
        }
        if (studentRepository.existsByRegisterNumber(request.getRegisterNumber())) {
            throw new RuntimeException("Register number already exists.");
        }

        // Create User
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.STUDENT)
                .build();
        user = userRepository.save(user);

        // Create Student profile
        Student student = Student.builder()
                .registerNumber(request.getRegisterNumber())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .department(request.getDepartment())
                .academicYear(request.getAcademicYear())
                .passedOutYear(request.getPassedOutYear())
                .cgpa(request.getCgpa())
                .gender(request.getGender())
                .dateOfBirth(request.getDateOfBirth())
                .nativePlace(request.getNativePlace())
                .historyOfArrears(request.getHistoryOfArrears() != null ? request.getHistoryOfArrears() : false)
                .fatherName(request.getFatherName())
                .motherName(request.getMotherName())
                .fatherOccupation(request.getFatherOccupation())
                .motherOccupation(request.getMotherOccupation())
                .parentPhoneNumber(request.getParentPhoneNumber())
                .user(user)
                .build();
        studentRepository.save(student);

        // Generate JWT
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .message("Signup successful! Welcome to PlaceHub.")
                .build();
    }

    @Override
    public User getCurrentUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
    }
}

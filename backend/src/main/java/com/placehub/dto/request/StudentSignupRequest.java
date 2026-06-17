package com.placehub.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class StudentSignupRequest {

    @NotBlank(message = "Register number is required")
    private String registerNumber;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
    private String phoneNumber;

    @NotBlank(message = "Department is required")
    private String department;

    private String academicYear;

    private Integer passedOutYear;

    @DecimalMin(value = "0.0", message = "CGPA must be at least 0.0")
    @DecimalMax(value = "10.0", message = "CGPA must be at most 10.0")
    private Double cgpa;

    private String gender;

    private LocalDate dateOfBirth;

    private String nativePlace;

    private Boolean historyOfArrears = false;

    private String fatherName;

    private String motherName;

    private String fatherOccupation;

    private String motherOccupation;

    @Pattern(regexp = "^[0-9]{10}$", message = "Parent phone must be exactly 10 digits")
    private String parentPhoneNumber;
}

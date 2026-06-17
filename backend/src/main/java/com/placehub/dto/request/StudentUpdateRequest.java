package com.placehub.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class StudentUpdateRequest {

    private String firstName;

    private String lastName;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be exactly 10 digits")
    private String phoneNumber;

    private String department;

    private String academicYear;

    private Integer passedOutYear;

    @DecimalMin(value = "0.0") @DecimalMax(value = "10.0")
    private Double cgpa;

    private String gender;

    private LocalDate dateOfBirth;

    private String nativePlace;

    private Boolean historyOfArrears;

    private String fatherName;

    private String motherName;

    private String fatherOccupation;

    private String motherOccupation;

    @Pattern(regexp = "^[0-9]{10}$", message = "Parent phone must be exactly 10 digits")
    private String parentPhoneNumber;
}

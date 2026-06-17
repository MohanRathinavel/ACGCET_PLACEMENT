package com.placehub.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PlacementResultRequest {

    @NotBlank(message = "Register number is required")
    private String registerNumber;

    @NotNull(message = "Company ID is required")
    private Long companyId;

    @NotNull(message = "Package LPA is required")
    private Double packageLpa;

    @NotBlank(message = "Role/designation is required")
    private String role;

    private LocalDate selectedDate;
}

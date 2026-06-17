package com.placehub.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CompanyRequest {

    @NotBlank(message = "Company name is required")
    private String companyName;

    private String companyType;

    private String description;

    private String email;

    private String phone;

    private String website;

    private String location;

    private String requiredDepartment;

    private Double minimumCgpa;

    private Boolean allowArrears = false;

    private Double packageLpa;

    private String jobRole;

    private String skillsRequired;

    private LocalDate lastDateToApply;

    private String logoUrl;
}

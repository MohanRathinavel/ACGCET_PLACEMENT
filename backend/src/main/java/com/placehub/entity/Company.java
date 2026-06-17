package com.placehub.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "companies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;

    @Column(nullable = false)
    private String companyName;

    private String companyType;

    @Column(columnDefinition = "TEXT")
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

    @Column(columnDefinition = "TEXT")
    private String skillsRequired;

    private LocalDate lastDateToApply;
    private String logoUrl;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<PlacementApplication> applications;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<InterviewSchedule> interviews;
}

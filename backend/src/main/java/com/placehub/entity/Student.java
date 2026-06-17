package com.placehub.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String registerNumber;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String phoneNumber;

    private String department;
    private String academicYear;
    private Integer passedOutYear;

    @DecimalMin("0.0")
    @DecimalMax("10.0")
    private Double cgpa;

    private String gender;
    private LocalDate dateOfBirth;
    private String nativePlace;
    private Boolean historyOfArrears = false;
    private String fatherName;
    private String motherName;
    private String fatherOccupation;
    private String motherOccupation;

    @Pattern(regexp = "^[0-9]{10}$", message = "Parent phone must be 10 digits")
    private String parentPhoneNumber;

    private String resumeUrl;
    private String profileImageUrl;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"student", "password"})
    private User user;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<PlacementApplication> applications;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<InterviewSchedule> interviews;

    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL)
    @JsonIgnore
    private PlacementResult placementResult;
}

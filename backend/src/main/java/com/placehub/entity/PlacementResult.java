package com.placehub.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "placement_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlacementResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    @JsonIgnoreProperties({"applications","interviews","placementResult","user","password"})
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    @JsonIgnoreProperties({"applications","interviews"})
    private Company company;

    private Double packageLpa;
    private String role;
    private LocalDate selectedDate;
}

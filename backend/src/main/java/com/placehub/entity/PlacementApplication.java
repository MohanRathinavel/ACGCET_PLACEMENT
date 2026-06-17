package com.placehub.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.placehub.enums.ApplicationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "placement_applications",
       uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "company_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlacementApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnoreProperties({"applications","interviews","placementResult","user","password"})
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    @JsonIgnoreProperties({"applications","interviews"})
    private Company company;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status = ApplicationStatus.APPLIED;

    private LocalDateTime appliedDate = LocalDateTime.now();

    @Column(columnDefinition = "TEXT")
    private String remarks;
}

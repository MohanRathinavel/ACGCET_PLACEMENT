package com.placehub.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.placehub.enums.InterviewMode;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "interview_schedules")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long interviewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnoreProperties({"applications","interviews","placementResult","user","password"})
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    @JsonIgnoreProperties({"applications","interviews"})
    private Company company;

    private LocalDate interviewDate;
    private LocalTime interviewTime;

    @Enumerated(EnumType.STRING)
    private InterviewMode interviewMode;

    private String meetingLink;
    private String venue;
    private String roundName;
    private String status;
}

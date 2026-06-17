package com.placehub.dto.request;

import com.placehub.enums.InterviewMode;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class InterviewRequest {

    @NotNull(message = "Student register number is required")
    private String registerNumber;

    @NotNull(message = "Company ID is required")
    private Long companyId;

    @NotNull(message = "Interview date is required")
    private LocalDate interviewDate;

    private LocalTime interviewTime;

    private InterviewMode interviewMode;

    private String meetingLink;

    private String venue;

    private String roundName;

    private String status;
}

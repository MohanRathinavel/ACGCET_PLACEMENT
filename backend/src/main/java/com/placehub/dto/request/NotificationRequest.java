package com.placehub.dto.request;

import com.placehub.enums.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NotificationRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Message is required")
    private String message;

    private Role targetRole;

    // Optional: target a specific student by register number
    private String registerNumber;
}

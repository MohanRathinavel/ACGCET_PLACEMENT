package com.placehub.service.impl;

import com.placehub.dto.request.NotificationRequest;
import com.placehub.entity.*;
import com.placehub.enums.Role;
import com.placehub.exception.ResourceNotFoundException;
import com.placehub.repository.*;
import com.placehub.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    @Override
    public Notification sendNotification(NotificationRequest request) {
        Student targetStudent = null;
        if (request.getRegisterNumber() != null && !request.getRegisterNumber().isBlank()) {
            targetStudent = studentRepository.findByRegisterNumber(request.getRegisterNumber())
                    .orElseThrow(() -> new ResourceNotFoundException("Student not found."));
        }

        Notification notification = Notification.builder()
                .title(request.getTitle())
                .message(request.getMessage())
                .targetRole(request.getTargetRole())
                .student(targetStudent)
                .readStatus(false)
                .build();

        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getNotificationsForStudent(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
        Student student = studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found."));
        // Return global STUDENT notifications + personal notifications for this student
        return notificationRepository.findByTargetRoleOrStudent(Role.STUDENT, student);
    }

    @Override
    public Notification markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Notification not found with ID: " + notificationId));
        notification.setReadStatus(true);
        return notificationRepository.save(notification);
    }
}

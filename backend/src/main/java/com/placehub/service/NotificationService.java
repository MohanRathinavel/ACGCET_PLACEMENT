package com.placehub.service;

import com.placehub.dto.request.NotificationRequest;
import com.placehub.entity.Notification;

import java.util.List;

public interface NotificationService {
    Notification sendNotification(NotificationRequest request);
    List<Notification> getNotificationsForStudent(String username);
    Notification markAsRead(Long notificationId);
}

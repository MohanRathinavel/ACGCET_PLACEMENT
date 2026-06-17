package com.placehub.repository;

import com.placehub.entity.Notification;
import com.placehub.entity.Student;
import com.placehub.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByTargetRoleOrStudent(Role role, Student student);
    List<Notification> findByTargetRole(Role role);
}

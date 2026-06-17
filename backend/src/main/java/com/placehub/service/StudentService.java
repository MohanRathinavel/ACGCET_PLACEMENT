package com.placehub.service;

import com.placehub.dto.request.StudentUpdateRequest;
import com.placehub.entity.Student;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StudentService {
    Student getProfileByUsername(String username);
    Student getProfileByRegisterNumber(String registerNumber);
    Student updateProfile(String username, StudentUpdateRequest request);
    String uploadResume(String username, MultipartFile file);
    String uploadProfileImage(String username, MultipartFile file);
    List<Student> getAllStudents();
    Student updateStudentByAdmin(String registerNumber, StudentUpdateRequest request);
    void deleteStudent(String registerNumber);
}

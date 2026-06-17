package com.placehub.service.impl;

import com.placehub.dto.request.StudentUpdateRequest;
import com.placehub.entity.Student;
import com.placehub.entity.User;
import com.placehub.exception.ResourceNotFoundException;
import com.placehub.repository.StudentRepository;
import com.placehub.repository.UserRepository;
import com.placehub.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Override
    public Student getProfileByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
        return studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found."));
    }

    @Override
    public Student getProfileByRegisterNumber(String registerNumber) {
        return studentRepository.findByRegisterNumber(registerNumber)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Student not found with register number: " + registerNumber));
    }

    @Override
    public Student updateProfile(String username, StudentUpdateRequest request) {
        Student student = getProfileByUsername(username);
        applyUpdates(student, request);
        return studentRepository.save(student);
    }

    @Override
    public String uploadResume(String username, MultipartFile file) {
        Student student = getProfileByUsername(username);
        String fileName = "resume_" + student.getRegisterNumber() + "_"
                + UUID.randomUUID() + getExtension(file.getOriginalFilename());
        String filePath = saveFile(file, "resumes", fileName);
        student.setResumeUrl(filePath);
        studentRepository.save(student);
        return filePath;
    }

    @Override
    public String uploadProfileImage(String username, MultipartFile file) {
        Student student = getProfileByUsername(username);
        String fileName = "profile_" + student.getRegisterNumber() + "_"
                + UUID.randomUUID() + getExtension(file.getOriginalFilename());
        String filePath = saveFile(file, "profiles", fileName);
        student.setProfileImageUrl(filePath);
        studentRepository.save(student);
        return filePath;
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student updateStudentByAdmin(String registerNumber, StudentUpdateRequest request) {
        Student student = getProfileByRegisterNumber(registerNumber);
        applyUpdates(student, request);
        return studentRepository.save(student);
    }

    @Override
    public void deleteStudent(String registerNumber) {
        Student student = getProfileByRegisterNumber(registerNumber);
        studentRepository.delete(student);
    }

    // ---- Helpers ----

    private void applyUpdates(Student student, StudentUpdateRequest req) {
        if (req.getFirstName() != null)        student.setFirstName(req.getFirstName());
        if (req.getLastName() != null)         student.setLastName(req.getLastName());
        if (req.getPhoneNumber() != null)      student.setPhoneNumber(req.getPhoneNumber());
        if (req.getDepartment() != null)       student.setDepartment(req.getDepartment());
        if (req.getAcademicYear() != null)     student.setAcademicYear(req.getAcademicYear());
        if (req.getPassedOutYear() != null)    student.setPassedOutYear(req.getPassedOutYear());
        if (req.getCgpa() != null)             student.setCgpa(req.getCgpa());
        if (req.getGender() != null)           student.setGender(req.getGender());
        if (req.getDateOfBirth() != null)      student.setDateOfBirth(req.getDateOfBirth());
        if (req.getNativePlace() != null)      student.setNativePlace(req.getNativePlace());
        if (req.getHistoryOfArrears() != null) student.setHistoryOfArrears(req.getHistoryOfArrears());
        if (req.getFatherName() != null)       student.setFatherName(req.getFatherName());
        if (req.getMotherName() != null)       student.setMotherName(req.getMotherName());
        if (req.getFatherOccupation() != null) student.setFatherOccupation(req.getFatherOccupation());
        if (req.getMotherOccupation() != null) student.setMotherOccupation(req.getMotherOccupation());
        if (req.getParentPhoneNumber() != null) student.setParentPhoneNumber(req.getParentPhoneNumber());
    }

    private String saveFile(MultipartFile file, String subDir, String fileName) {
        try {
            Path dirPath = Paths.get(uploadDir, subDir);
            Files.createDirectories(dirPath);
            Path filePath = dirPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return "/uploads/" + subDir + "/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file: " + e.getMessage());
        }
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) return "";
        return filename.substring(filename.lastIndexOf('.'));
    }
}

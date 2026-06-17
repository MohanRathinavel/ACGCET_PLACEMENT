package com.placehub.controller;

import com.placehub.dto.request.StudentUpdateRequest;
import com.placehub.dto.response.ApiResponse;
import com.placehub.dto.response.DashboardSummary;
import com.placehub.entity.Student;
import com.placehub.repository.*;
import com.placehub.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AdminController {

    private final StudentService studentService;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final PlacementApplicationRepository applicationRepository;
    private final PlacementResultRepository resultRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardSummary>> getDashboard() {
        DashboardSummary summary = DashboardSummary.builder()
                .totalStudents(studentRepository.count())
                .totalCompanies(companyRepository.count())
                .totalApplications(applicationRepository.count())
                .totalPlaced(resultRepository.count())
                .build();
        return ResponseEntity.ok(ApiResponse.success("Dashboard data fetched", summary));
    }

    @GetMapping("/students")
    public ResponseEntity<ApiResponse<List<Student>>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(ApiResponse.success("Students fetched", students));
    }

    @GetMapping("/students/{registerNumber}")
    public ResponseEntity<ApiResponse<Student>> getStudentByRegNo(
            @PathVariable String registerNumber) {
        Student student = studentService.getProfileByRegisterNumber(registerNumber);
        return ResponseEntity.ok(ApiResponse.success("Student fetched", student));
    }

    @PutMapping("/students/{registerNumber}")
    public ResponseEntity<ApiResponse<Student>> updateStudent(
            @PathVariable String registerNumber,
            @Valid @RequestBody StudentUpdateRequest request) {
        Student updated = studentService.updateStudentByAdmin(registerNumber, request);
        return ResponseEntity.ok(ApiResponse.success("Student updated", updated));
    }

    @DeleteMapping("/students/{registerNumber}")
    public ResponseEntity<ApiResponse<Void>> deleteStudent(
            @PathVariable String registerNumber) {
        studentService.deleteStudent(registerNumber);
        return ResponseEntity.ok(ApiResponse.success("Student deleted", null));
    }
}

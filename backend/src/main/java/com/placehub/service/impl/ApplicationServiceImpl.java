package com.placehub.service.impl;

import com.placehub.dto.request.ApplicationStatusRequest;
import com.placehub.entity.*;
import com.placehub.exception.ResourceNotFoundException;
import com.placehub.repository.*;
import com.placehub.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final PlacementApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Override
    public PlacementApplication applyToCompany(String username, Long companyId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
        Student student = studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found."));
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found."));

        // Prevent duplicate applications
        if (applicationRepository.existsByStudentAndCompany(student, company)) {
            throw new RuntimeException("You have already applied to this company.");
        }

        // Check eligibility: CGPA
        if (company.getMinimumCgpa() != null && student.getCgpa() != null
                && student.getCgpa() < company.getMinimumCgpa()) {
            throw new RuntimeException("You do not meet the minimum CGPA requirement of "
                    + company.getMinimumCgpa());
        }

        // Check eligibility: Arrears
        if (Boolean.FALSE.equals(company.getAllowArrears())
                && Boolean.TRUE.equals(student.getHistoryOfArrears())) {
            throw new RuntimeException("This company does not allow students with history of arrears.");
        }

        // Check eligibility: Department
        if (company.getRequiredDepartment() != null
                && !company.getRequiredDepartment().isBlank()
                && !company.getRequiredDepartment().equalsIgnoreCase("ALL")
                && !company.getRequiredDepartment().equalsIgnoreCase(student.getDepartment())) {
            throw new RuntimeException("Your department is not eligible for this company.");
        }

        PlacementApplication application = PlacementApplication.builder()
                .student(student)
                .company(company)
                .build();

        return applicationRepository.save(application);
    }

    @Override
    public List<PlacementApplication> getApplicationsByStudent(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
        Student student = studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found."));
        return applicationRepository.findByStudent(student);
    }

    @Override
    public List<PlacementApplication> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
    public PlacementApplication updateApplicationStatus(Long applicationId,
                                                        ApplicationStatusRequest request) {
        PlacementApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Application not found with ID: " + applicationId));
        application.setStatus(request.getStatus());
        if (request.getRemarks() != null) {
            application.setRemarks(request.getRemarks());
        }
        return applicationRepository.save(application);
    }
}

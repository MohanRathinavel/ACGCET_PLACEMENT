package com.placehub.service.impl;

import com.placehub.dto.request.PlacementResultRequest;
import com.placehub.entity.*;
import com.placehub.exception.ResourceNotFoundException;
import com.placehub.repository.*;
import com.placehub.service.PlacementResultService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlacementResultServiceImpl implements PlacementResultService {

    private final PlacementResultRepository resultRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;

    @Override
    public PlacementResult addResult(PlacementResultRequest request) {
        Student student = studentRepository.findByRegisterNumber(request.getRegisterNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found."));
        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company not found."));

        PlacementResult result = PlacementResult.builder()
                .student(student)
                .company(company)
                .packageLpa(request.getPackageLpa())
                .role(request.getRole())
                .selectedDate(request.getSelectedDate())
                .build();

        return resultRepository.save(result);
    }

    @Override
    public List<PlacementResult> getAllResults() {
        return resultRepository.findAll();
    }

    @Override
    public PlacementResult getResultByRegisterNumber(String registerNumber) {
        return resultRepository.findByStudentRegisterNumber(registerNumber)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Placement result not found for register number: " + registerNumber));
    }
}

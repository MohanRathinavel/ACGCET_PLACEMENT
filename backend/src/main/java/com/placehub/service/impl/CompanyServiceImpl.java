package com.placehub.service.impl;

import com.placehub.dto.request.CompanyRequest;
import com.placehub.entity.Company;
import com.placehub.exception.ResourceNotFoundException;
import com.placehub.repository.CompanyRepository;
import com.placehub.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;

    @Override
    public Company addCompany(CompanyRequest request) {
        Company company = Company.builder()
                .companyName(request.getCompanyName())
                .companyType(request.getCompanyType())
                .description(request.getDescription())
                .email(request.getEmail())
                .phone(request.getPhone())
                .website(request.getWebsite())
                .location(request.getLocation())
                .requiredDepartment(request.getRequiredDepartment())
                .minimumCgpa(request.getMinimumCgpa())
                .allowArrears(request.getAllowArrears() != null ? request.getAllowArrears() : false)
                .packageLpa(request.getPackageLpa())
                .jobRole(request.getJobRole())
                .skillsRequired(request.getSkillsRequired())
                .lastDateToApply(request.getLastDateToApply())
                .logoUrl(request.getLogoUrl())
                .build();
        return companyRepository.save(company);
    }

    @Override
    public Company updateCompany(Long companyId, CompanyRequest request) {
        Company company = getCompanyById(companyId);
        if (request.getCompanyName() != null)      company.setCompanyName(request.getCompanyName());
        if (request.getCompanyType() != null)      company.setCompanyType(request.getCompanyType());
        if (request.getDescription() != null)      company.setDescription(request.getDescription());
        if (request.getEmail() != null)            company.setEmail(request.getEmail());
        if (request.getPhone() != null)            company.setPhone(request.getPhone());
        if (request.getWebsite() != null)          company.setWebsite(request.getWebsite());
        if (request.getLocation() != null)         company.setLocation(request.getLocation());
        if (request.getRequiredDepartment() != null) company.setRequiredDepartment(request.getRequiredDepartment());
        if (request.getMinimumCgpa() != null)      company.setMinimumCgpa(request.getMinimumCgpa());
        if (request.getAllowArrears() != null)      company.setAllowArrears(request.getAllowArrears());
        if (request.getPackageLpa() != null)       company.setPackageLpa(request.getPackageLpa());
        if (request.getJobRole() != null)          company.setJobRole(request.getJobRole());
        if (request.getSkillsRequired() != null)   company.setSkillsRequired(request.getSkillsRequired());
        if (request.getLastDateToApply() != null)  company.setLastDateToApply(request.getLastDateToApply());
        if (request.getLogoUrl() != null)          company.setLogoUrl(request.getLogoUrl());
        return companyRepository.save(company);
    }

    @Override
    public void deleteCompany(Long companyId) {
        Company company = getCompanyById(companyId);
        companyRepository.delete(company);
    }

    @Override
    public Company getCompanyById(Long companyId) {
        return companyRepository.findById(companyId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Company not found with ID: " + companyId));
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public List<Company> getCompaniesByType(String companyType) {
        return companyRepository.findByCompanyType(companyType);
    }
}

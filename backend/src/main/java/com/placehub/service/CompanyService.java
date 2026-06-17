package com.placehub.service;

import com.placehub.dto.request.CompanyRequest;
import com.placehub.entity.Company;

import java.util.List;

public interface CompanyService {
    Company addCompany(CompanyRequest request);
    Company updateCompany(Long companyId, CompanyRequest request);
    void deleteCompany(Long companyId);
    Company getCompanyById(Long companyId);
    List<Company> getAllCompanies();
    List<Company> getCompaniesByType(String companyType);
}

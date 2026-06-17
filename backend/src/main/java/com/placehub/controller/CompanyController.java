package com.placehub.controller;

import com.placehub.dto.request.CompanyRequest;
import com.placehub.dto.response.ApiResponse;
import com.placehub.entity.Company;
import com.placehub.service.CompanyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class CompanyController {

    private final CompanyService companyService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Company>> addCompany(
            @Valid @RequestBody CompanyRequest request) {
        Company company = companyService.addCompany(request);
        return ResponseEntity.ok(ApiResponse.success("Company added", company));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Company>>> getAllCompanies() {
        return ResponseEntity.ok(
                ApiResponse.success("Companies fetched", companyService.getAllCompanies()));
    }

    @GetMapping("/{companyId}")
    public ResponseEntity<ApiResponse<Company>> getCompanyById(
            @PathVariable Long companyId) {
        return ResponseEntity.ok(
                ApiResponse.success("Company fetched", companyService.getCompanyById(companyId)));
    }

    @PutMapping("/{companyId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Company>> updateCompany(
            @PathVariable Long companyId,
            @Valid @RequestBody CompanyRequest request) {
        Company updated = companyService.updateCompany(companyId, request);
        return ResponseEntity.ok(ApiResponse.success("Company updated", updated));
    }

    @DeleteMapping("/{companyId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteCompany(
            @PathVariable Long companyId) {
        companyService.deleteCompany(companyId);
        return ResponseEntity.ok(ApiResponse.success("Company deleted", null));
    }

    @GetMapping("/type/{companyType}")
    public ResponseEntity<ApiResponse<List<Company>>> getCompaniesByType(
            @PathVariable String companyType) {
        return ResponseEntity.ok(ApiResponse.success("Companies fetched",
                companyService.getCompaniesByType(companyType)));
    }
}

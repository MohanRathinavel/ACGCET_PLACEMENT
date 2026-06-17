package com.placehub.service;

import com.placehub.dto.request.ApplicationStatusRequest;
import com.placehub.entity.PlacementApplication;

import java.util.List;

public interface ApplicationService {
    PlacementApplication applyToCompany(String username, Long companyId);
    List<PlacementApplication> getApplicationsByStudent(String username);
    List<PlacementApplication> getAllApplications();
    PlacementApplication updateApplicationStatus(Long applicationId, ApplicationStatusRequest request);
}

package com.placehub.dto.response;

import lombok.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardSummary {
    private long totalStudents;
    private long totalCompanies;
    private long totalApplications;
    private long totalPlaced;
}

package com.placehub.controller;

import com.placehub.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * AI Placeholder Controller
 * These endpoints are placeholders for future AI features:
 * - Resume analyzer
 * - Company matching
 * - Skill gap analysis
 */
@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AiController {

    @PostMapping("/resume-analyze/{registerNumber}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> analyzeResume(
            @PathVariable String registerNumber) {
        Map<String, Object> result = Map.of(
                "registerNumber", registerNumber,
                "status", "PLACEHOLDER",
                "message", "AI Resume Analyzer coming soon. This endpoint will analyze the student's resume and provide improvement suggestions.",
                "score", 0,
                "suggestions", new String[]{"Feature not yet implemented"}
        );
        return ResponseEntity.ok(ApiResponse.success("AI Resume Analyzer (Placeholder)", result));
    }

    @GetMapping("/company-match/{registerNumber}/{companyId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> matchCompany(
            @PathVariable String registerNumber,
            @PathVariable Long companyId) {
        Map<String, Object> result = Map.of(
                "registerNumber", registerNumber,
                "companyId", companyId,
                "status", "PLACEHOLDER",
                "message", "AI Company Matcher coming soon. This will calculate the match score between student profile and company requirements.",
                "matchScore", 0,
                "recommendation", "Feature not yet implemented"
        );
        return ResponseEntity.ok(ApiResponse.success("AI Company Match (Placeholder)", result));
    }

    @GetMapping("/skill-gap/{registerNumber}/{companyId}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> analyzeSkillGap(
            @PathVariable String registerNumber,
            @PathVariable Long companyId) {
        Map<String, Object> result = Map.of(
                "registerNumber", registerNumber,
                "companyId", companyId,
                "status", "PLACEHOLDER",
                "message", "AI Skill Gap Analyzer coming soon. This will identify missing skills and suggest learning resources.",
                "missingSkills", new String[]{},
                "recommendedCourses", new String[]{"Feature not yet implemented"}
        );
        return ResponseEntity.ok(ApiResponse.success("AI Skill Gap Analysis (Placeholder)", result));
    }
}

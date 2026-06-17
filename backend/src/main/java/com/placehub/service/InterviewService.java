package com.placehub.service;

import com.placehub.dto.request.InterviewRequest;
import com.placehub.entity.InterviewSchedule;

import java.util.List;

public interface InterviewService {
    InterviewSchedule scheduleInterview(InterviewRequest request);
    List<InterviewSchedule> getAllInterviews();
    List<InterviewSchedule> getInterviewsByStudent(String username);
    InterviewSchedule updateInterview(Long interviewId, InterviewRequest request);
    void deleteInterview(Long interviewId);
}

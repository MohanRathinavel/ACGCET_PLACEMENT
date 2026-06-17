package com.placehub.service.impl;

import com.placehub.dto.request.InterviewRequest;
import com.placehub.entity.*;
import com.placehub.exception.ResourceNotFoundException;
import com.placehub.repository.*;
import com.placehub.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewServiceImpl implements InterviewService {

    private final InterviewScheduleRepository interviewRepository;
    private final StudentRepository studentRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Override
    public InterviewSchedule scheduleInterview(InterviewRequest request) {
        Student student = studentRepository.findByRegisterNumber(request.getRegisterNumber())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found."));
        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company not found."));

        InterviewSchedule interview = InterviewSchedule.builder()
                .student(student)
                .company(company)
                .interviewDate(request.getInterviewDate())
                .interviewTime(request.getInterviewTime())
                .interviewMode(request.getInterviewMode())
                .meetingLink(request.getMeetingLink())
                .venue(request.getVenue())
                .roundName(request.getRoundName())
                .status(request.getStatus() != null ? request.getStatus() : "SCHEDULED")
                .build();

        return interviewRepository.save(interview);
    }

    @Override
    public List<InterviewSchedule> getAllInterviews() {
        return interviewRepository.findAll();
    }

    @Override
    public List<InterviewSchedule> getInterviewsByStudent(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));
        Student student = studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found."));
        return interviewRepository.findByStudent(student);
    }

    @Override
    public InterviewSchedule updateInterview(Long interviewId, InterviewRequest request) {
        InterviewSchedule interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Interview not found with ID: " + interviewId));
        if (request.getInterviewDate() != null)  interview.setInterviewDate(request.getInterviewDate());
        if (request.getInterviewTime() != null)  interview.setInterviewTime(request.getInterviewTime());
        if (request.getInterviewMode() != null)  interview.setInterviewMode(request.getInterviewMode());
        if (request.getMeetingLink() != null)    interview.setMeetingLink(request.getMeetingLink());
        if (request.getVenue() != null)          interview.setVenue(request.getVenue());
        if (request.getRoundName() != null)      interview.setRoundName(request.getRoundName());
        if (request.getStatus() != null)         interview.setStatus(request.getStatus());
        return interviewRepository.save(interview);
    }

    @Override
    public void deleteInterview(Long interviewId) {
        InterviewSchedule interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Interview not found with ID: " + interviewId));
        interviewRepository.delete(interview);
    }
}

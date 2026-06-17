package com.placehub.service;

import com.placehub.dto.request.PlacementResultRequest;
import com.placehub.entity.PlacementResult;

import java.util.List;

public interface PlacementResultService {
    PlacementResult addResult(PlacementResultRequest request);
    List<PlacementResult> getAllResults();
    PlacementResult getResultByRegisterNumber(String registerNumber);
}

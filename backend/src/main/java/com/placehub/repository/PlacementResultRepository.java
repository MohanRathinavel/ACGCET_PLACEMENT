package com.placehub.repository;

import com.placehub.entity.PlacementResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlacementResultRepository extends JpaRepository<PlacementResult, Long> {
    Optional<PlacementResult> findByStudentRegisterNumber(String registerNumber);
}

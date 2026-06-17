package com.placehub.repository;

import com.placehub.entity.PlacementApplication;
import com.placehub.entity.Student;
import com.placehub.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlacementApplicationRepository extends JpaRepository<PlacementApplication, Long> {
    List<PlacementApplication> findByStudent(Student student);
    boolean existsByStudentAndCompany(Student student, Company company);
    Optional<PlacementApplication> findByStudentAndCompany(Student student, Company company);
    long count();
}

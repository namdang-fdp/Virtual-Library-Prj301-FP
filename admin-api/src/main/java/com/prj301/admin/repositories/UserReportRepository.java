package com.prj301.admin.repositories;

import com.prj301.admin.models.entity.UserReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserReportRepository extends JpaRepository<UserReport, UUID> {
    public Page<UserReport> findByUserUsernameContainingIgnoreCase(String username, Pageable pageable);
}

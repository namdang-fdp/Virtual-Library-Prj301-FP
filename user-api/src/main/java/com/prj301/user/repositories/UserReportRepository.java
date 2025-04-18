package com.prj301.user.repositories;

import com.prj301.user.models.entity.UserReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserReportRepository extends JpaRepository<UserReport, UUID> {
}

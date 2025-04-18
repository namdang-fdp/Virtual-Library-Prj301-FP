package com.prj301.user.repositories;

import com.prj301.user.models.entity.CommentReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CommentReportRepository extends JpaRepository<CommentReport, UUID> {
}

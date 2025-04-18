package com.prj301.admin.repositories;

import com.prj301.admin.models.entity.CommentReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CommentReportRepository extends JpaRepository<CommentReport, UUID> {
    public Page<CommentReport> findByCommentContentContainingIgnoreCase(String content, Pageable pageable);

    @Query("SELECT COUNT(DISTINCT cr.comment.book) FROM CommentReport cr")
    public long countDistinctBook();
}

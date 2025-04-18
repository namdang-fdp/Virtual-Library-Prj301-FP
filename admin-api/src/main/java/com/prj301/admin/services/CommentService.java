package com.prj301.admin.services;

import com.prj301.admin.models.dto.comment.CommentReportResponse;
import com.prj301.admin.models.entity.CommentReport;
import com.prj301.admin.repositories.CommentReportRepository;
import com.prj301.admin.repositories.CommentRepository;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentReportRepository commentReportRepository;

    private CommentReportResponse toResponse(CommentReport report) {
        val comment = report.getComment();
        val book = comment.getBook();
        val user = comment.getUser();
        val reportingUser = report.getReportingUser();

        return new CommentReportResponse(
            report.getId(),
            comment.getId(),
            comment.getContent(),
            user.getUsername(),
            book.getTitle(),
            report.getCreatedAt(),
            reportingUser.getUsername(),
            report.getReason()
        );
    }

    public Page<CommentReportResponse> findAllReport(Pageable pageable) {
        return commentReportRepository
            .findAll(pageable)
            .map(this::toResponse);
    }

    public Page<CommentReportResponse> findAllReport(String content, Pageable pageable) {
        return commentReportRepository
            .findByCommentContentContainingIgnoreCase(content, pageable)
            .map(this::toResponse);
    }

    public long countReport() {
        return commentReportRepository.count();
    }

    public long countDistinctBook() {
        return commentReportRepository.countDistinctBook();
    }

    public void delete(UUID id) {
        commentRepository.deleteById(id);
    }

    public void deleteReport(UUID id) {
        commentReportRepository.deleteById(id);
    }
}
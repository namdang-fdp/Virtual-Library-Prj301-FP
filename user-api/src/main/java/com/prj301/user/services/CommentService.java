package com.prj301.user.services;

import com.prj301.user.models.dto.comment.CommentRequest;
import com.prj301.user.models.dto.comment.CommentResponse;
import com.prj301.user.models.dto.report.CommentReportRequest;
import com.prj301.user.models.entity.*;
import com.prj301.user.repositories.BookRepository;
import com.prj301.user.repositories.CommentReportRepository;
import com.prj301.user.repositories.CommentRepository;
import com.prj301.user.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentReportRepository commentReportRepository;

    public List<CommentResponse> getCommentsById(UUID bookId) {
        Book book = bookRepository
            .findById(bookId)
            .orElseThrow(() -> new RuntimeException("Book Not Found!"));
        List<Comment> comments = commentRepository.findByBookOrderByCreatedAtDesc(book);
        return comments
            .stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    public CommentResponse addComment(UUID bookId, CommentRequest commentRequest, User user) {
        Book book = bookRepository
            .findById(bookId)
            .orElseThrow(() -> new RuntimeException("Book Not Found!"));
        Comment comment = Comment
            .builder()
            .book(book)
            .user(user)
            .content(commentRequest.getContent())
            .build();
        Comment savedComment = commentRepository.save(comment);
        return toResponse(savedComment);
    }

    private CommentResponse toResponse(Comment comment) {
        return new CommentResponse(
            comment.getId(),
            comment
                .getUser()
                .getUsername(),
            comment.getContent(),
            comment.getCreatedAt()
        );
    }

    public long countByUsername(String username) {
        return commentRepository.countByUser_Username(username);
    }

    public boolean report(CommentReportRequest reason, UUID commentId, UUID reportingUserId) {
        try {
            createAndSaveReport(reason, commentId, reportingUserId);
            return true;
        } catch (EntityNotFoundException e) {
            System.out.printf("Failed to report comment: %s%n", e.getMessage());
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public void createAndSaveReport(
            @Nullable CommentReportRequest reason,
            UUID commentId,
            UUID reportingUserId
    ) {
        String reportReason = (reason != null && !reason.getReason().isEmpty()) ? reason.getReason() : "No reason provided";

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found"));

        User user = userRepository.findById(reportingUserId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        CommentReport commentReport = CommentReport.builder()
                .comment(comment)
                .reportingUser(user)
                .reason(reportReason)
                .build();

        commentReportRepository.save(commentReport);
    }
}

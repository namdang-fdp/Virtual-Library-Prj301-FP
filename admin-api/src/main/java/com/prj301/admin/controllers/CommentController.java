package com.prj301.admin.controllers;

import com.prj301.admin.interceptors.JWSProtected;
import com.prj301.admin.models.dto.DeleteDTO;
import com.prj301.admin.models.dto.comment.CommentReportResponse;
import com.prj301.admin.services.CommentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
@SecurityRequirement(name = "Bearer Authentication")
@JWSProtected
public class CommentController {
    @Autowired
    private CommentService service;

    @GetMapping("/report/count")
    public long countReport() {
        return service.countReport();
    }

    @GetMapping("/report/count-book")
    public long countReportBook() {
        return service.countDistinctBook();
    }

    @GetMapping("/report")
    public Page<CommentReportResponse> findAll(
        @RequestParam(value = "content", required = false) String content, Pageable pageable) {
        if (content == null || content.isEmpty()) {
            return service.findAllReport(pageable);
        }

        return service.findAllReport(content, pageable);
    }

    @DeleteMapping
    public void delete(
        @RequestBody DeleteDTO data
    ) {
        service.delete(data.getId());
    }

    @DeleteMapping("/report")
    public void deleteReport(
        @RequestBody DeleteDTO data
    ) {
        service.deleteReport(data.getId());
    }
}
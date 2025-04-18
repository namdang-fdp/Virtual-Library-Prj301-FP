package com.prj301.admin.controllers;

import com.prj301.admin.interceptors.JWSProtected;
import com.prj301.admin.models.dto.CountResponse;
import com.prj301.admin.models.dto.DeleteDTO;
import com.prj301.admin.models.dto.user.UserReportResponse;
import com.prj301.admin.models.dto.user.UserResponse;
import com.prj301.admin.services.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@SecurityRequirement(name = "Bearer Authentication")
@JWSProtected
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping
    public Page<UserResponse> findAll(
        @RequestParam(value = "title", required = false) String title,
        Pageable pageable
    ) {
        if (title == null || title.isEmpty()) {
            return service.findAll(pageable);
        }

        return service.findAll(title, pageable);
    }

    @GetMapping("/count")
    public long count() {
        return service.count();
    }

    @GetMapping("/count/month")
    public List<CountResponse> countByMonth() {
        return service.countByMonth();
    }

    @DeleteMapping
    public void delete(
        @RequestBody DeleteDTO data
    ) {
        service.delete(data.getId());
    }

    @GetMapping("/report")
    public Page<UserReportResponse> findAllReport(
        @RequestParam(value = "title", required = false) String title,
        Pageable pageable
    ) {
        if (title == null || title.isEmpty()) {
            return service.findAllReport(pageable);
        }

        return service.findAllReport(title, pageable);
    }

    @DeleteMapping("/report")
    public void deleteReport(@RequestBody DeleteDTO data) {
        service.deleteReport(data.getId());
    }
}
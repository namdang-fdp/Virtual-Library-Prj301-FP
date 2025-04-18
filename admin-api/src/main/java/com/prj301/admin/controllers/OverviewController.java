package com.prj301.admin.controllers;

import com.prj301.admin.interceptors.JWSProtected;
import com.prj301.admin.models.dto.overview.OverviewResponse;
import com.prj301.admin.services.OverviewService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/overview")
@SecurityRequirement(name = "Bearer Authentication")
@JWSProtected
public class OverviewController {
    @Autowired
    private OverviewService service;

    @GetMapping
    public OverviewResponse get() {
        return service.get();
    }
}

package com.prj301.admin.models.dto.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
public class UserReportResponse {
    private final UUID id;
    private final UUID userId;
    private final String username;
    private final String fullName;
    private final LocalDateTime createdAt;
    private final String reportingUser;
    private final String reason;
}

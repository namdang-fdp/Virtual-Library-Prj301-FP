package com.prj301.admin.models.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
@Schema
public class LoginRequest {
    @Schema(
        description = "User's login username",
        example = "admin"
    )
    private String username;

    @Schema(
        description = "User's password",
        example = "admin"
    )
    private String password;
}

package com.prj301.user.models.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
@Schema
public class LoginRequest {
    @Schema(
        description = "User's login username",
        example = "john.doe"
    )
    private String username;

    @Schema(
        description = "User's password",
        example = "P@ssw0rd!"
    )
    private String password;
}

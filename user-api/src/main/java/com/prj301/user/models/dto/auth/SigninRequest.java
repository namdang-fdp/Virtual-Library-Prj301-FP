package com.prj301.user.models.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
@Schema
public class SigninRequest {
    @Schema(
        description = "Username of the user",
        example = "john.doe"
    )
    private String username;

    @Schema(
        description = "Password of the user",
        example = "P@ssw0rd!"
    )
    private String password;

    @Schema(
        description = "Full name of the user",
        example = "John Doe"
    )
    private String fullName;
}

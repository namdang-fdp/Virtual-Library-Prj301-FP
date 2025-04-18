package com.prj301.user.models.dto.user;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@RequiredArgsConstructor
public class UserResponse {
    private final String username;
    private final String avatarPath;
    private final String fullName;
    private final String hobbies;
    private final LocalDate dob;
    private final String bio;
    private final LocalDateTime createdAt;
}
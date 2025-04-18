package com.prj301.user.models.dto.user;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UpdateUserRequest {
    private String fullName;
    private String hobbies;
    private LocalDate dob;
    private String bio;
}

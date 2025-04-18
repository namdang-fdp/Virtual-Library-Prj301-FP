package com.prj301.user.services;

import com.prj301.user.models.dto.report.UserReportRequest;
import com.prj301.user.models.dto.user.UserResponse;
import com.prj301.user.models.dto.user.UpdateUserRequest;
import com.prj301.user.models.entity.User;
import com.prj301.user.models.entity.UserReport;
import com.prj301.user.repositories.UserReportRepository;
import com.prj301.user.repositories.UserRepository;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final UserReportRepository userReportRepository;

    @Autowired
    private final S3Service s3Service;

    public UserResponse toUserResponse(User user) {
        return new UserResponse(
            user.getUsername(),
            user.getAvatarPath(),
            user.getFullName(),
            user.getHobbies(),
            user.getDob(),
            user.getBio(),
            user.getCreatedAt()
        );
    }

    public Optional<User> findById(UUID id) {
        return userRepository.findById(id);
    }

    public UserResponse findByUsername(String username) {
        return userRepository
            .findByUsernameContainsIgnoreCase(username)
            .map(this::toUserResponse)
            .orElse(null);
    }

    public boolean update(UUID id, MultipartFile avatarFile, UpdateUserRequest data) {
        try {
            val user = userRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("User not existed"));
            if (data.getFullName() != null)
                user.setFullName(data.getFullName());
            if (data.getHobbies() != null)
                user.setHobbies(data.getHobbies());
            if (data.getBio() != null)
                user.setBio(data.getBio());
            if (data.getDob() != null)
                user.setDob(data.getDob());

            if(!avatarFile.isEmpty()) {
                val avatarPath = s3Service.upload("avatar", user.getUsername(), avatarFile);
                if (avatarPath == null) return false;

                user.setAvatarPath(avatarPath);
            }

            userRepository.save(user);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean report(UserReportRequest reason, String username, UUID reportingUserId) {
        try {
            createAndSaveReport(reason, username, reportingUserId);
            return true;
        } catch (EntityNotFoundException e) {
            System.out.printf("Failed to report user: %s%n", e.getMessage());
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public void createAndSaveReport(
        UserReportRequest reason,
        String username,
        UUID reportingUserId
    ) {
        String reportReason = (reason != null && !reason
            .getReason()
            .isEmpty()) ? reason.getReason() : "No reason provided";

        User user = userRepository
            .findByUsernameContainsIgnoreCase(username)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));

        User reportingUser = userRepository
            .findById(reportingUserId)
            .orElseThrow(() -> new EntityNotFoundException("User not found"));

        UserReport userReport = UserReport
            .builder()
            .user(user)
            .reportingUser(reportingUser)
            .reason(reportReason)
            .build();

        userReportRepository.save(userReport);
    }
}
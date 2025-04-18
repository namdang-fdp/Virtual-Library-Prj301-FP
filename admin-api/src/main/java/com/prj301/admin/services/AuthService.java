package com.prj301.admin.services;

import com.prj301.admin.models.dto.auth.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Value("${server.admin.username}")
    private String ADMIN_USERNAME;

    @Value("${server.admin.password}")
    private String ADMIN_PASSWORD;

    @Autowired
    private JWSService jwsService;

    public String login(LoginRequest loginRequest) {

        if (loginRequest
            .getUsername()
            .equals(ADMIN_USERNAME) && loginRequest
            .getPassword()
            .equals(ADMIN_PASSWORD)) {
            return jwsService.generateToken();
        }
        return null;
    }
}

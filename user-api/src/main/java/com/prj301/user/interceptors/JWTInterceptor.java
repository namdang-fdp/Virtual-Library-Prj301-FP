package com.prj301.user.interceptors;

import com.prj301.user.services.JWTService;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.UUID;

@Component
public class JWTInterceptor implements HandlerInterceptor {
    @Autowired
    private JWTService jwtService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
                                                                                                       Exception {
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }
        HandlerMethod method = (HandlerMethod) handler;

        boolean isProtected = method.getMethodAnnotation(JWTProtected.class) != null
            || method
            .getBeanType()
            .isAnnotationPresent(JWTProtected.class);
        if (!isProtected) {
            return true;
        }

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization header");
            return false;
        }
        String token = authHeader.substring(7);

        try {
            UUID id = jwtService.extractId(token);
            request.setAttribute("user-id", id);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}

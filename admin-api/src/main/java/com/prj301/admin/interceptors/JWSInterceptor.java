package com.prj301.admin.interceptors;

import com.prj301.admin.services.JWSService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class JWSInterceptor implements HandlerInterceptor {
    @Autowired
    private JWSService jwsService;

    @Override
    public boolean preHandle(
        HttpServletRequest request,
        HttpServletResponse response,
        Object handler
    ) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod method = (HandlerMethod) handler;
            boolean isProtected = method.getMethodAnnotation(JWSProtected.class) != null
                || method
                .getBeanType()
                .isAnnotationPresent(JWSProtected.class);

            if (isProtected) {
                String authHeader = request.getHeader("Authorization");
                if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization header");
                    return false;
                }
                String token = authHeader.substring(7);

                return jwsService.validateToken(token);
            }
        }
        return true;
    }
}

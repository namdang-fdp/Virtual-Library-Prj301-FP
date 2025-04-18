package com.prj301.user.services;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
public class JWTService {
    @Value("${jwt.expiration-time}")
    private long EXPIRATION_TIME;

    public String generateToken(UUID id) {
        return Jwts
            .builder()
            .setSubject(id.toString())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts
                .parserBuilder()
                .build()
                .parseClaimsJwt(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public UUID extractId(String token) throws JwtException {
        String rawId = Jwts
            .parserBuilder()
            .build()
            .parseClaimsJwt(token)
            .getBody()
            .getSubject();

        return UUID.fromString(rawId);
    }
}

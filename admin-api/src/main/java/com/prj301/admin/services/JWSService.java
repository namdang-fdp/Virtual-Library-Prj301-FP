package com.prj301.admin.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.*;
import java.util.Date;

@Slf4j
@Service
public class JWSService {
    private final String ROLE = "admin";

    @Value("${jws.expiration-time}")
    private long EXPIRATION_TIME;

    private final KeyPair keyPair = Keys.keyPairFor(SignatureAlgorithm.ES256);

    public String generateToken() {
        return Jwts
            .builder()
            .claim("role", ROLE)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(keyPair.getPrivate(), SignatureAlgorithm.ES256)
            .compact();
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(keyPair.getPublic())
                .build()
                .parseClaimsJws(token)
                .getBody();

            return claims.get("role").equals(ROLE);
        } catch (JwtException e) {
            return false;
        }
    }
}
package com.prj301.user.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class S3Config {
    @Value("${aws.access_key_id}")
    private String awsId;

    @Value("${aws.secret_access_key}")
    private String awsKey;

    @Value("${aws.region}")
    private String region;

    @Value("${s3.endpoint}")
    private String endpoint;


    @Bean
    public S3Client s3Client() throws URISyntaxException {
        return S3Client
            .builder()
            .region(Region.of(region))
            .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(awsId, awsKey)))
            .endpointOverride(new URI(endpoint))
            .forcePathStyle(true)
            .build();
    }
}
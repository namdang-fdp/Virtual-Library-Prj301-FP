package com.prj301.user.services;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.InputStream;

@Slf4j
@Service
public class S3Service {
    @Value("${s3.bucket}")
    private String bucketName;

    @Value("${s3.endpoint}")
    private String endpoint;

    @Value("${s3.prefix}")
    private String prefix;

    @Autowired
    private S3Client s3Client;

    @Autowired
    private CompressionService compressionService;

    public String upload(String key, File file) {
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest
                .builder()
                .bucket(bucketName)
                .key(key)
                .acl(ObjectCannedACL.PUBLIC_READ)
                .build();
            s3Client.putObject(putObjectRequest, RequestBody.fromFile(file));

            return prefix + key;
        } catch (S3Exception e) {
            log.error(e.toString());
            return null;
        }
    }

    public String upload(String keyPrefix, String id, MultipartFile multipartFile) {
        try {
            multipartFile = compressionService.compress(multipartFile);
            File file = File.createTempFile("temp", multipartFile.getOriginalFilename());
            multipartFile.transferTo(file);

            String key = String.format(
                "%s/%s.%s", keyPrefix, id, FilenameUtils.getExtension(multipartFile.getOriginalFilename()));
            String path = upload(key, file);
            file.delete();

            return path;
        } catch (Exception e) {
            log.error(e.toString());
            return null;
        }
    }

    public InputStream download(String key) {
        try {
            GetObjectRequest getObjectRequest = GetObjectRequest
                .builder()
                .bucket(bucketName)
                .key(key)
                .build();
            return s3Client.getObject(getObjectRequest);
        } catch (S3Exception e) {
            log.error(e.toString());
            return null;
        }
    }
}
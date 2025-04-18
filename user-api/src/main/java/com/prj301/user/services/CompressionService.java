package com.prj301.user.services;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfSmartCopy;
import com.itextpdf.text.pdf.PdfStamper;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

@Slf4j
@Service
public class CompressionService {
    @Value("${server.compression.image-size}")
    private int IMAGE_SIZE;

    private MultipartFile replace(MultipartFile file, byte[] content) throws IOException {
        DiskFileItem fileItem = new DiskFileItem(
            file.getName(),
            file.getContentType(),
            false,
            file.getOriginalFilename(),
            content.length,
            null
        );
        fileItem
            .getOutputStream()
            .write(content);

        return new CommonsMultipartFile(fileItem);
    }

    private MultipartFile compressImage(MultipartFile file) throws IOException {
        BufferedImage original = ImageIO.read(file.getInputStream());
        if (original == null) throw new IOException("Invalid image provided");

        ByteArrayOutputStream output = new ByteArrayOutputStream();
        Thumbnails
            .of(original)
            .size(IMAGE_SIZE, IMAGE_SIZE)
            .keepAspectRatio(true)
            .outputFormat("jpg")
            .toOutputStream(output);

        byte[] content = output.toByteArray();
        val res = replace(file, content);
        log.info("Compress from {} to {}", file.getSize(), res.getSize());

        return res;
    }

    private MultipartFile compressPdf(MultipartFile file) throws IOException, DocumentException {
        PdfReader reader = new PdfReader(file.getInputStream());
        ByteArrayOutputStream output = new ByteArrayOutputStream();

        PdfStamper stamper = new PdfStamper(reader, output);
        int total = reader.getNumberOfPages() + 1;
        for (int i = 1; i < total; i++) {
            reader.setPageContent(i + 1, reader.getPageContent(i + 1));
        }
        stamper.setFullCompression();
        stamper.close();

        byte[] content = output.toByteArray();
        val res = replace(file, content);
        log.info("Compress from {} to {}", file.getSize(), res.getSize());

        return res;
    }

    public MultipartFile compress(MultipartFile file) {
        try {
            val contentType = file.getContentType();
            if (contentType == null) return file;

            if (contentType.startsWith("image/"))
                return compressImage(file);

            if (contentType.equals("application/pdf"))
                return compressPdf(file);

            return file;
        } catch (Exception error) {
            log.error("Compressing file with error: {}", error);
            return file;
        }
    }
}

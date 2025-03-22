package com.example.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Service
public class StockService {
    public ResponseEntity<?> processFile(MultipartFile file) {
        if (!file.getContentType().equals("text/csv")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file format. Please upload a CSV file.");
        }

        try {
            Path tempFile = Files.createTempFile("stock_data", ".csv");
            Files.copy(file.getInputStream(), tempFile, StandardCopyOption.REPLACE_EXISTING);

            ProcessBuilder pb = new ProcessBuilder("python", "../../Python/analyze.py", tempFile.toString());
            Process process = pb.start();
            process.waitFor();

            return ResponseEntity.ok().body("File processed successfully. Check 'trend.png' for results.");
        } catch (IOException | InterruptedException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing file: " + e.getMessage());
        }
    }
}

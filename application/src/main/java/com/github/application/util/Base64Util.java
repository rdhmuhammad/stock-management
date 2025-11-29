package com.github.application.util;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;

public class Base64Util {
    public static String getBase64FromUrl(String fileUrl) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<byte[]> response = restTemplate.getForEntity(fileUrl, byte[].class);

            byte[] fileBytes = response.getBody();
            if (fileBytes == null || fileBytes.length == 0) {
                return null;
            }
            return Base64.getEncoder().encodeToString(fileBytes);
        } catch (Exception e) {
            return null;
        }
    }
}

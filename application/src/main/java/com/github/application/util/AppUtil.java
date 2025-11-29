package com.github.application.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface AppUtil {
    boolean isNullOrEmpty(String str);

    String convertToBase64(MultipartFile file);

    String GenerateNoDocument();

    String replaceSpaceWithStrip(String str);

    String mapToTemplate(String path, Map<String, String> args) throws IOException;

    void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException;

}

package com.github.application.util;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Slf4j
@Component
public class AppUtilImpl implements AppUtil {

    public boolean isNullOrEmpty(String str) {
        return str == null || str.isEmpty() || str == "";
    }

    public String convertToBase64(MultipartFile file) {
        try {
            byte[] fileBytes = file.getBytes();
            String base64String = Base64.getEncoder().encodeToString(fileBytes);
            return base64String;
        } catch (IOException e) {
            log.error("convertToBase64 error {}", e.getMessage(), e);
            return null;
        }
    }

    public String GenerateNoDocument() {
        Date date = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        return sdf.format(calendar.getTime());
    }

    public String replaceSpaceWithStrip(String str) {
        if (str != null || !str.isEmpty() || str != "") {
            char targetChar = ' ';
            char replacementChar = '-';
            return str.replace(targetChar, replacementChar);
        }
        return str;
    }

    @Override
    public String mapToTemplate(String path, Map<String, String> args) throws IOException {
        Resource resources = new ClassPathResource(path);
        InputStream resource =  resources.getInputStream();
//        InputStream resource = FileReader.class.getClassLoader().getResourceAsStream(path);
        String template = IOUtils.toString(resource, StandardCharsets.UTF_8);
//        File file = ResourceUtils.getFile("classpath:" + path);
//        String template = new String(Files.readAllBytes(file.toPath()));

        for (Map.Entry<String, String> entry : args.entrySet()) {
            template = template.replace(entry.getKey(), entry.getValue());
        }
        return template;
    }

    @Override
    public void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException {
        Path uploadPath = Paths.get(uploadDir);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {
            log.error("Could not save image file {} >> : {} ", fileName, ioe.getMessage());
        }
    }

}

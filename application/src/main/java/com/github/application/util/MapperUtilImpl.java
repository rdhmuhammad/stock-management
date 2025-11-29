package com.github.application.util;

import com.github.application.constant.AppConstants;
import org.simmetrics.metrics.StringMetrics;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class MapperUtilImpl implements MapperUtil {

    public String escapeUrlChar(String value) {
        StringBuilder builder = new StringBuilder();
        char[] ch = value.toCharArray();
        for (char c : ch) {
            builder.append(Objects.nonNull(AppConstants.StringUtility.escapeChars.get(String.valueOf(c))) ?
                    AppConstants.StringUtility.escapeChars.get(String.valueOf(c)) : c);
        }

        return builder.toString();
    }

    public List<Map.Entry<String, Float>> findMatcherJaroWinkler(String input, List<String> candidates, int limit) {
        return candidates.stream()
                .map(p -> Map.entry(p, StringMetrics.jaroWinkler().compare(input, p)))
                .sorted((a, b) -> Float.compare(b.getValue(), a.getValue())) // descending
                .limit(limit)
                .toList();
    }

    public String reverseEscapeUrlChar(String value) {
        Pattern compile = Pattern.compile("$[0-9A-F]+.+$\n");
        Matcher matcher = compile.matcher(value);
        return matcher.replaceAll((matchResult -> AppConstants.StringUtility
                .escapeChars.getKey(matchResult.toString())));
    }


    @Override
    public MultiValueMap<String, Object> stringToMultipartRequest(String body) {
        MultiValueMap<String, Object> reqMapper = new LinkedMultiValueMap<>();
        String[] parts = body.split("----------------------------[a-zA-Z0-9]+");
        for (String part : parts) {
            String[] lines = part.split("\r\n");

            // Extract form data
            String name = null;
            String filename = null;
            String contentType = null;
            StringBuilder content = new StringBuilder();

            for (String line : lines) {
                if (line.startsWith("Content-Disposition:")) {
                    if (line.contains("name")) {
                        name = line.substring(line.indexOf("name=\"") + 6, line.lastIndexOf("\""));
                    }
                    if (line.contains("filename")) {
                        filename = line.substring(line.indexOf("filename=\"") + 10, line.lastIndexOf("\""));
                    }
                } else if (line.startsWith("Content-Type:")) {
                    contentType = line.substring(line.indexOf(":") + 1).trim();
                } else if (!line.isEmpty()) {
                    content.append(line);
                }
            }

            // Add extracted data to MultipartEntityBuilder
            if (name != null && !name.isEmpty()) {
                if (filename != null && !filename.isEmpty()) {
                    reqMapper.add(name, content.toString().getBytes());
                } else {
                    reqMapper.add(name, content.toString());
                }
            }
        }

        return reqMapper;
    }
}

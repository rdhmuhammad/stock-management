package com.github.application.util;

import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Map;

public interface MapperUtil {
    MultiValueMap<String, Object> stringToMultipartRequest(String body);

    public String escapeUrlChar(String value);

    public String reverseEscapeUrlChar(String value);

    List<Map.Entry<String, Float>> findMatcherJaroWinkler(String input, List<String> candidates, int limit);
}

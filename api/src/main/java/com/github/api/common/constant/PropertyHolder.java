package com.github.api.common.constant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class PropertyHolder {
    @Value("${application.upload-dir}")
    public String UPLOAD_DIR;

}

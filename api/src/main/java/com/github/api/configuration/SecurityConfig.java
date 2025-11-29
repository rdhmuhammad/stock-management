package com.github.api.configuration;

import com.github.security.config.UserSecurityService;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
public class SecurityConfig extends UserSecurityService {
    @Override
    public CorsConfiguration applyCors() {
        return null;
    }
}

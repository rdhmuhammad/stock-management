package com.github.application.exception;

public class AppConfigException extends RuntimeException {

    public AppConfigException(String configKey) {
        super("configuration not exist " + configKey);
    }
}

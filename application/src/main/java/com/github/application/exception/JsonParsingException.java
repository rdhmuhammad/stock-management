package com.github.application.exception;

public class JsonParsingException extends RuntimeException {
    public JsonParsingException(String message, Exception e) {
        super(message, e);
    }
}

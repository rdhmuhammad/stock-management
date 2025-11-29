package com.github.application.exception;

public class CustomException extends RuntimeException {
    private final int status;

    public CustomException(String message) {
        super(message);
        this.status = 400; // Default to 400
    }

    public CustomException(int status, String message) {
        super(message);
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}

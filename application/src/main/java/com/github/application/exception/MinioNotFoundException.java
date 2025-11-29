package com.github.application.exception;

public class MinioNotFoundException extends RuntimeException {

    public MinioNotFoundException() {
        super("resource not found");
    }
}

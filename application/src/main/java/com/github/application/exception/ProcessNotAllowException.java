package com.github.application.exception;

public class ProcessNotAllowException extends RuntimeException{

    public ProcessNotAllowException() {
        super("forbidden access");
    }

    public ProcessNotAllowException(String message) {
        super(message);
    }
}

package com.github.application.exception;

public class NotFoundDataException extends RuntimeException{

    public NotFoundDataException() {
        super("Data not found");
    }

    public NotFoundDataException(String message) {
        super(message);
    }
}

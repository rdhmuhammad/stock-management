package com.github.application.exception;

public class ParameterNotAllowException extends RuntimeException {

    public ParameterNotAllowException() {
        super("Parameter not set");
    }

    public ParameterNotAllowException(String field) {
        super(field + " parameter not set");
    }

}

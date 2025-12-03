package com.github.api.base;


import com.github.api.common.exception.AccessNotAllowException;
import com.github.api.common.exception.InvalidDataException;
import com.github.api.common.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

public class BaseService {


    protected <T extends BaseEntity> T created(T entity) {
        entity.setCreatedDate(new Date());
        entity.setModifiedDate(new Date());
        entity.setCreatedBy("system");
        entity.setModifiedBy("system");
        return entity;
    }

    protected <T extends BaseEntity> Collection<T> created(Collection<T> entity) {
        entity.forEach(this::created);
        return entity;
    }



    private String SUCCESS;

    private String ERROR;

    private final Integer SUCCESS_CODE = 200;

    protected void setSuccess(String msg) {
        SUCCESS = msg;
    }

    protected void setError(String msg){
        ERROR = msg;
    }


    @Autowired
    protected Validator validator;

    public BaseService() {
    }

    protected <T> void validateValue(T request) {
        Set<ConstraintViolation<T>> oks = this.validator.validate(request);
        if (!oks.isEmpty()) {
            throw new ConstraintViolationException(oks);
        }
    }

    public <T> ServiceResolver<T> success() {
        return new ServiceResolver<>(SUCCESS, SUCCESS_CODE);
    }

    public <T> ServiceResolver<T> success(String msg) {
        return new ServiceResolver<>(msg, SUCCESS_CODE);
    }

    public <T> ServiceResolver<T> success(String msg, T data) {
        return new ServiceResolver<>(data, msg, SUCCESS_CODE);
    }

    public <T> ServiceResolver<T> success(T data) {
        return new ServiceResolver<>(data, SUCCESS, SUCCESS_CODE);
    }

    public <T extends Pageable, E extends Pageable> ServiceResolver<E> success(T data, ResponseConverter<T, E> converter) {
        return new ServiceResolver<>(converter.convert(data), SUCCESS, SUCCESS_CODE);
    }

    public <T extends Pageable, E extends Pageable> ServiceResolver<E> success(T data, ResponseConverter<T, E> converter, String msg) {
        return new ServiceResolver<>(converter.convert(data), msg, SUCCESS_CODE);
    }

    public void errorData(String message){
        throw new InvalidDataException(message);
    }
    public void unauthorized(String message){
        throw new AccessNotAllowException(message);
    }

    public void dataNotFound(String message){
        throw new NotFoundException(message);
    }

}

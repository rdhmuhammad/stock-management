package com.github.api.base;

import com.github.api.base.converter.ResponseConverter;
import com.github.api.base.converter.ResponseListConverterFunctional;
import com.github.api.base.converter.ResponsePageConverterFunctional;
import com.github.api.common.constant.AppConstants;
import com.github.application.util.BeanCopy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.http.ResponseEntity;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;

@NoRepositoryBean
public class BaseResController {

    @Autowired
    protected Validator validator;

    @Autowired
    protected BeanCopy beanCopier;

    public BaseResController() {
    }

    protected <T> void validateValue(T request) {
        Set<ConstraintViolation<T>> oks = this.validator.validate(request);
        if (!oks.isEmpty()) {
            throw new ConstraintViolationException(oks);
        }
    }


    protected ResponseEntity<Response<?>> responsePageFunc() {
        Response<Object> response = new Response<>(AppConstants.Message.DEFAULT_SUCCESS, true);
        return ResponseEntity.ok(response);
    }

    protected <T> ResponseEntity<Response<T>> responsePageFunc(ServiceResolver<T> body) {
        Response<T> response = new Response<>(AppConstants.Message.DEFAULT_SUCCESS, true, body.getData());
        return ResponseEntity.ok(response);
    }

    protected <T, E> ResponseEntity<Response<PageResponse<E>>> responsePageFunc(ServiceResolver<T> body, ResponsePageConverterFunctional<T> converter) {
        PageResponse responseData = converter.toConverter(body.getData());
        Response<PageResponse<E>> response = new Response<>(AppConstants.Message.DEFAULT_SUCCESS, true, responseData);
        return ResponseEntity.ok(response);
    }

    protected <T, E> ResponseEntity<Response<List<E>>> responseListFunc(ServiceResolver<T> body, ResponseListConverterFunctional<T> converter) {
        List responseData = converter.toConverter(body.getData());
        Response<List<E>> response = new Response<>(AppConstants.Message.DEFAULT_SUCCESS, true, responseData);
        return ResponseEntity.ok(response);
    }



    protected ResponseEntity<Response> responseMessage(String msg) {
        Response<Object> response = new Response<>(msg, true);
        return ResponseEntity.ok(response);
    }

    protected <Dest, Src> ResponseEntity<Response<Dest>> responsePageFunc(ServiceResolver<Src> resolver, ResponseConverter<Src, Dest> converter) {
        Dest convert = converter.convert(resolver.getData());
        Response<Dest> response = new Response<>(AppConstants.Message.DEFAULT_SUCCESS, true, convert);
        return ResponseEntity.ok(response);
    }

    protected <Dest, Src> ResponseEntity<Response<PageResponse<Dest>>> responsePage(ServiceResolver<Page<Src>> resolver, ResponseConverter<Page<Src>, PageResponse<Dest>> converter) {
        PageResponse<Dest> convert = converter.convert(resolver.getData());
        Response<PageResponse<Dest>> response = new Response<>(AppConstants.Message.DEFAULT_SUCCESS, true, convert);
        return ResponseEntity.ok(response);
    }

    protected <Dest, Src> ResponseEntity<Response<List<Dest>>> responseList(ServiceResolver<List<Src>> resolver, ResponseConverter<List<Src>, List<Dest>> converter) {
        List<Dest> convert = converter.convert(resolver.getData());
        Response<List<Dest>> response = new Response<>(AppConstants.Message.DEFAULT_SUCCESS, true, convert);
        return ResponseEntity.ok(response);
    }

    private <DestDt, SrcDt, Src extends Page<SrcDt>> ResponseConverter<Src, PageResponse<DestDt>> getPageConverter(Class<DestDt> dtClass) {
        return new ResponseConverter<>() {
            @Override
            public PageResponse<DestDt> convert(Src src) {
                List<DestDt> destDts = beanCopier.copyCollection(src.getContent(), dtClass);
                return new PageResponse(src, destDts);
            }
        };
    }

    private <DestDt, SrcDt> ResponseConverter<List<SrcDt>, List<DestDt>> getListConverter(Class<DestDt> dtClass) {
        return new ResponseConverter<List<SrcDt>, List<DestDt>>() {
            @Override
            public List<DestDt> convert(List<SrcDt> src) {
                return beanCopier.copyCollection(src, dtClass);
            }
        };
    }

    private <Dest, Src> ResponseConverter<Src, Dest> getDetailConverter(Class<Dest> destClass) {
        return new ResponseConverter<>() {
            @Override
            public Dest convert(Src src) {
                return beanCopier.copy(src, destClass);
            }

        };
    }

    protected <T, E> ResponseEntity<Response<E>> responseConvertDetail(ServiceResolver<T> resolver, Class<E> tClass) {
        return responsePageFunc(resolver, getDetailConverter(tClass));
    }

    protected <T, E> ResponseEntity<Response<PageResponse<E>>> responseConvertPage(ServiceResolver<Page<T>> resolver, Class<E> tClass) {
        return responsePage(resolver, getPageConverter(tClass));
    }

    protected <T, E> ResponseEntity<Response<List<E>>> responseConvertList(ServiceResolver<List<T>> resolver, Class<E> tClass) {
        return responseList(resolver, getListConverter(tClass));
    }

}

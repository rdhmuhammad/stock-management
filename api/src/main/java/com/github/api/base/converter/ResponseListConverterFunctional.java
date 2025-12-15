package com.github.api.base.converter;

import com.github.api.base.PageResponse;

import java.util.List;

@FunctionalInterface
public interface ResponseListConverterFunctional<Src> {

    List toConverter(Src source);
}

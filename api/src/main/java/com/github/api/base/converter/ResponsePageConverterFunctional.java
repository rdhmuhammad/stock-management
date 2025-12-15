package com.github.api.base.converter;

import com.github.api.base.PageResponse;

@FunctionalInterface
public interface ResponsePageConverterFunctional<Src> {

    PageResponse toConverter(Src source);
}

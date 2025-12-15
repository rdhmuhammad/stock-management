package com.github.api.base.converter;


public abstract class ResponseConverter<Src, Desc> {
    public ResponseConverter() {
    }

    public abstract Desc convert(Src src);
}
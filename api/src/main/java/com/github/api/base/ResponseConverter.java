package com.github.api.base;

public abstract class ResponseConverter<Src, Desc> {
    public ResponseConverter() {
    }

    protected abstract Desc convert(Src src);
}
package com.github.application.util;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class BeanCopyImpl implements BeanCopy {

    private final Logger log = LoggerFactory.getLogger(BeanCopyImpl.class);

    public BeanCopyImpl() {

    }

    public <T> T copy(Object source, Class<T> typeClass, String... exc) {
        if (Objects.isNull(source)) {
            log.error("source cannot be null");
            throw new NullPointerException();
        }

        T o = BeanUtils.instantiateClass(typeClass);
        BeanUtils.copyProperties(source, o, exc);
        return o;
    }

    public <E, T> List<T> copyCollection(List<E> src, Class<T> tclass) {
        return copyCollection(src, new ArrayList<>(), tclass, (String[]) null);
    }


    public <E, T> List<T> copyCollection(List<E> source, List<T> dest, Class<T> tClass, @Nullable String... exc) {
        if (Objects.isNull(source)) {
            return new ArrayList<>();
        }

        for (E next : source) {
            T copy = copy(next, tClass, exc);
            dest.add(copy);
        }

        return dest;
    }

}

package com.github.api.repository.api.validation.columnduplicatevalidation;

import java.lang.annotation.*;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface EnableAllDuplication {
}
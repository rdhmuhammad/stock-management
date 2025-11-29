package com.github.api.common.util;

import org.springframework.lang.Nullable;

import java.util.List;

/**
 * Interface for bean copying operations.
 * This acts as a plugin interface to decouple api module from concrete implementations.
 */
public interface BeanCopier {

    /**
     * Copy properties from source object to a new instance of target class
     *
     * @param source The source object
     * @param targetClass The target class to create instance of
     * @param excludeProperties Optional properties to exclude from copying
     * @param <T> Target type
     * @return New instance of target class with copied properties
     */
    <T> T copy(Object source, Class<T> targetClass, String... excludeProperties);

    /**
     * Copy a collection of objects to a list of target type
     *
     * @param source The source list
     * @param targetClass The target class for each element
     * @param <E> Source element type
     * @param <T> Target element type
     * @return List of copied objects
     */
    <E, T> List<T> copyCollection(List<E> source, Class<T> targetClass);

    /**
     * Copy a collection of objects to a destination list
     *
     * @param source The source list
     * @param destination The destination list
     * @param targetClass The target class for each element
     * @param excludeProperties Optional properties to exclude from copying
     * @param <E> Source element type
     * @param <T> Target element type
     * @return The destination list with copied objects
     */
    <E, T> List<T> copyCollection(List<E> source, List<T> destination, Class<T> targetClass, @Nullable String... excludeProperties);
}

package com.github.api.base;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Objects;


@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class PageResponse<T> {

    public PageResponse(ServiceResolver<Page<T>> resolver) {
        Page<T> page = resolver.getData();
        if (Objects.isNull(page)) return;
        this.page = page.getPageable().getPageNumber()+1;
        this.values = page.getContent();
        this.pageTotal = page.getTotalPages();
        this.elementTotal = page.getTotalElements();
        this.isFirst = page.isFirst();
        this.isEmpty = page.isEmpty();
        this.isLast = page.isLast();
    }



    public PageResponse(){}

    public PageResponse(Page<T> page) {
        if (Objects.isNull(page)) return;
        this.page = page.getPageable().getPageNumber()+1;
        this.values = page.getContent();
        this.pageTotal = page.getTotalPages();
        this.elementTotal = page.getTotalElements();
        this.isFirst = page.isFirst();
        this.isEmpty = page.isEmpty();
        this.isLast = page.isLast();
    }

    public PageResponse(List<T> list, Page page) {
        if (Objects.isNull(page)) return;
        this.page = page.getPageable().getPageNumber()+1;
        this.values = list;
        this.pageTotal = page.getTotalPages();
        this.elementTotal = page.getTotalElements();
        this.isFirst = page.isFirst();
        this.isEmpty = page.isEmpty();
        this.isLast = page.isLast();
    }

    List<T> values;

    long elementTotal;

    int page;

    int pageTotal;

    boolean isFirst;

    boolean isEmpty;

    boolean isLast;

    public PageResponse(List<T> values, long elementTotal, int page, int pageTotal, boolean isFirst, boolean isEmpty, boolean isLast) {
        this.values = values;
        this.elementTotal = elementTotal;
        this.page = page;
        this.pageTotal = pageTotal;
        this.isFirst = isFirst;
        this.isEmpty = isEmpty;
        this.isLast = isLast;
    }

    public PageResponse(Page<T> src, List<T> destDts) {
        if (Objects.isNull(src)) return;
        this.page = src.getPageable().getPageNumber()+1;
        this.values = src.getContent();
        this.pageTotal = src.getTotalPages();
        this.elementTotal = src.getTotalElements();
        this.isFirst = src.isFirst();
        this.isEmpty = src.isEmpty();
        this.isLast = src.isLast();
        this.values = destDts;
    }
}
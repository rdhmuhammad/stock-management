package com.github.api.service;

import com.github.api.base.ServiceResolver;
import com.github.api.repository.api.request.CreateIndicatorRequest;
import com.github.api.repository.api.request.IndicatorPageRequest;
import com.github.api.repository.database.entity.Indicator;
import org.springframework.data.domain.Page;

public interface IndicatorService {
    void create(CreateIndicatorRequest request);

    ServiceResolver<Page<Indicator>> getPaged(IndicatorPageRequest request);

}

package com.github.api.service;

import com.github.api.repository.api.request.CreateIndicatorRequest;

public interface IndicatorService {
    void create(CreateIndicatorRequest request);
}

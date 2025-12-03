package com.github.api.base;

import com.github.api.service.IndicatorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

public class AppController extends BaseResController {

    @Autowired
    protected IndicatorServiceImpl indicatorService;
}
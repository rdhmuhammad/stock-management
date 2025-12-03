package com.github.api.base;

import com.github.api.common.constant.AppConstants;
import com.github.api.common.constant.PropertyHolder;
import com.github.api.repository.database.repository.*;
import com.github.application.util.BeanCopy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

@Slf4j
public class AppService extends BaseService {

    // ================= Util ===========================
    @Autowired
    protected BeanCopy beanCopy;


    // ================= Repository =====================

    @Autowired
    protected IndicatorRepository indicatorRepository;


    @Autowired
    protected IndicatorCategoryRepository categoryRepository;

    @Autowired
    protected IndicatorAspectRepository aspectRepository;

    @Autowired
    protected AspectSignalRepository signalRepository;

    @Autowired
    protected PropertyHolder propertyHolder;


    public AppService() {
        setSuccess(AppConstants.Message.DEFAULT_SUCCESS);
        setError(AppConstants.Message.DEFAULT_ERROR);
    }

}

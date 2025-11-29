package com.github.api.base;

import com.github.api.common.constant.AppConstants;
import com.github.api.common.constant.PropertyHolder;
import com.github.api.repository.database.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;

@Slf4j
public class AppService extends BaseService {

    @Autowired
    protected UserRepository userRepository;

    @Autowired
    protected PropertyHolder propertyHolder;


    public AppService() {
        setSuccess(AppConstants.Message.DEFAULT_SUCCESS);
        setError(AppConstants.Message.DEFAULT_ERROR);
    }

}

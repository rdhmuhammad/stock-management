package com.github.api.service;

import com.github.api.base.BasePageRequest;
import com.github.api.base.ServiceResolver;
import com.github.api.repository.api.request.RegisterRequest;
import com.github.api.repository.database.entity.User;
import org.springframework.data.domain.Page;

import java.io.IOException;

public interface UserService {

    ServiceResolver<User> register(RegisterRequest request) throws IOException;

    ServiceResolver<Page<User>> getPage(Long companyId, BasePageRequest request);
}

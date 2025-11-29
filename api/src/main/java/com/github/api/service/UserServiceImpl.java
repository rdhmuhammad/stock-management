package com.github.api.service;


import com.github.api.base.AppService;
import com.github.api.base.BasePageRequest;
import com.github.api.base.ServiceResolver;
import com.github.api.common.constant.AppConstants;
import com.github.api.common.exception.InvalidDataException;
import com.github.api.common.util.validationutil.ValidationResult;
import com.github.api.repository.api.request.RegisterRequest;
import com.github.api.repository.database.entity.User;
import com.github.application.util.AppUtil;
import com.github.application.util.BeanCopy;
import com.github.application.util.BeanCopyImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Slf4j
public class UserServiceImpl extends AppService implements UserService {

    @Autowired
    BeanCopy beanCopy;

    @Autowired
    AppUtil appUtil;

    @Override
    public ServiceResolver<User> register(RegisterRequest request) throws IOException {
//        ValidationResult validationResult = validateDuplication(User.class)
//                .getResult(request);
//        if (!validationResult.getIsValid()) {
//            throw new InvalidDataException(validationResult.getMessage());
//        }
        User user = beanCopy.copy(request, User.class);

        MultipartFile profilePicture = request.getProfilePicture();
        appUtil.saveFile(propertyHolder.UPLOAD_DIR, profilePicture.getOriginalFilename(), profilePicture);

        user.setProfilePicture(profilePicture.getOriginalFilename());
        userRepository.save(user);
        return success(user);
    }

    @Override
    public ServiceResolver<Page<User>> getPage(Long companyId, BasePageRequest request) {
        Page<User> user = userRepository.findAll(request.pageRequest());
        return success(user);
    }

}

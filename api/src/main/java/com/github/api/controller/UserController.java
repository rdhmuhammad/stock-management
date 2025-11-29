package com.github.api.controller;

import com.github.api.base.AppController;
import com.github.api.base.BasePageRequest;
import com.github.api.base.ServiceResolver;
import com.github.api.repository.api.request.RegisterRequest;
import com.github.api.repository.api.response.RegisterResponse;
import com.github.api.repository.database.entity.User;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api/v1/user")
public class UserController extends AppController {

    @PostMapping(value = "/register", consumes = {
            MediaType.MULTIPART_FORM_DATA_VALUE,
    })
    public ResponseEntity<?> register(@ModelAttribute @Valid RegisterRequest request) throws IOException {
        ServiceResolver<User> resolver = userService.register(request);
        return responseConvertDetail(resolver, RegisterResponse.class);
    }

    @GetMapping("/all/{companyId}")
    public ResponseEntity<?> all(@PathVariable Long companyId, BasePageRequest request) throws IOException {
        userService.getPage(companyId, request);
        return response();
    }
}

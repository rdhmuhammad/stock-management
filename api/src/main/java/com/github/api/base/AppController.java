package com.github.api.base;

import com.github.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

public class AppController extends BaseResController {

    @Autowired
    protected UserService userService;
}
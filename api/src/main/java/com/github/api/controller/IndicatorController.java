package com.github.api.controller;

import com.github.api.base.AppController;
import com.github.api.base.ServiceResolver;
import com.github.api.repository.api.request.CreateIndicatorRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/indicator")
public class IndicatorController extends AppController {

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody @Valid CreateIndicatorRequest request) {
        indicatorService.create(request);
        return responseMessage("Indicator created");
    }
}

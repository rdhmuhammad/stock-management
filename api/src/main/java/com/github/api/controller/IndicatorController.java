package com.github.api.controller;

import com.github.api.base.*;
import com.github.api.base.request.BasePageRequest;
import com.github.api.base.request.PageWithDateRequest;
import com.github.api.repository.api.request.CreateIndicatorRequest;
import com.github.api.repository.api.request.IndicatorPageRequest;
import com.github.api.repository.api.response.CategoryDropdownResponse;
import com.github.api.repository.api.response.IndicatorPageResponse;
import com.github.api.repository.database.entity.Indicator;
import com.github.api.repository.database.entity.IndicatorCategory;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/indicator")
public class IndicatorController extends AppController {

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody @Valid CreateIndicatorRequest request) {
        indicatorService.create(request);
        return responseMessage("Indicator created");
    }

    @GetMapping("/category-dropdown")
    public ResponseEntity<?> categoryDropdown() {
        ServiceResolver<List<IndicatorCategory>> resolver = indicatorService.categoryDropdown();
        return responseListFunc(resolver, (list)->{
            List<CategoryDropdownResponse> responseList = new ArrayList<>();
            for (IndicatorCategory category : list) {
                CategoryDropdownResponse categoryResponse = new CategoryDropdownResponse();
                categoryResponse.setColor("");
                categoryResponse.setLabel(category.getName());
                categoryResponse.setValue(category.getCode());
                responseList.add(categoryResponse);
            }
            return responseList;
        } );
    }

    @GetMapping("/paged")
    public ResponseEntity<Response<PageResponse<IndicatorPageResponse>>> paged(IndicatorPageRequest request) {
        ServiceResolver<Page<Indicator>> resolver = indicatorService.getPaged(request);

        return responsePageFunc(resolver, (page) -> {
            List<IndicatorPageResponse> result = new ArrayList<>();
            for (Indicator indicator : resolver.getData()) {
                IndicatorPageResponse copy = beanCopier.copy(indicator, IndicatorPageResponse.class);
                copy.setStatus("inactive");
                Optional.ofNullable(indicator.getIsActive()).ifPresent(isActive -> {
                    copy.setStatus(isActive ? "active" : "inactive");
                });
                copy.setCategoryName(indicator.getCategoryId().getName());
                result.add(copy);
            }

            return new PageResponse(page, result);
        });

    }
}

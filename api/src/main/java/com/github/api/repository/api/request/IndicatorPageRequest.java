package com.github.api.repository.api.request;

import com.github.api.base.request.BasePageRequest;
import com.github.api.base.request.PageWithDateRequest;
import com.github.application.util.StringUtil;
import lombok.Data;

@Data
public class IndicatorPageRequest extends PageWithDateRequest {

    private String status;

    public Boolean getStatus() {
        if (!StringUtil.IsNullOrEmpty(status)) {
            return Boolean.parseBoolean(status);
        }
        return null;
    }

    private String category;
}

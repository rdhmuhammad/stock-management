package com.github.api.base.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.github.application.constant.AppConstants;
import com.github.application.util.StringUtil;
import lombok.Data;

import java.util.Date;

@Data
public class PageWithDateRequest extends BasePageRequest {

    @JsonProperty("start_date")
    private String startDateStr;

    @JsonProperty("end_date")
    private String endDateStr;

    public Date getStartDate() {
        if (StringUtil.IsNullOrEmpty(startDateStr)) {
            return null;
        }
        return AppConstants.DATE_FORMAT.dateFormat(startDateStr, AppConstants.DATE_FORMAT.RequestDateFormat);
    }

    public Date getEndDate() {
        if (StringUtil.IsNullOrEmpty(endDateStr)) {
            return null;
        }
        return AppConstants.DATE_FORMAT.dateFormat(endDateStr, AppConstants.DATE_FORMAT.RequestDateFormat);
    }

    public void setStart_date(String startDate) {
        this.startDateStr = startDate;
    }

    public void setEnd_date(String endDate) {
        this.endDateStr = endDate;
    }

}

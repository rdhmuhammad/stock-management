package com.github.api.repository.api.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.github.application.constant.AppConstants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class IndicatorPageResponse {
    private String code;

    @JsonProperty("name")
    private String title;

    private Float weight;

    private String status;

    private String categoryName;


    @JsonFormat(pattern = AppConstants.DATE_FORMAT.ResponseDateFormat, timezone = AppConstants.DATE_FORMAT.ResponseTimeZone)
    private Date createdDate;
}

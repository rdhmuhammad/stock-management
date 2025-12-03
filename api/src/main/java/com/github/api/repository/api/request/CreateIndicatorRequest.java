package com.github.api.repository.api.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.github.api.repository.database.entity.SignalKey;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class CreateIndicatorRequest {
    private String code;

    private String title;

    private String description;

    @NotNull(message = "category cannot be empty")
    private String categoryCode;

    @NotNull(message = "weight cannot be empty")
    @DecimalMin(value = "0.0", message = "minimal value is 0.0")
    @DecimalMax(value = "100.0", message = "maximal value is 100.0")
    private Float weight;

    private List<AspectInfo> aspects;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class AspectInfo {
        private String code;

        private String name;

        @NotNull(message = "weight cannot be empty")
        @DecimalMin(value = "0.0", message = "minimal value is 0.0")
        @DecimalMax(value = "100.0", message = "maximal value is 100.0")
        private Float weight;

        private String description;

        private List<AspectSignal> signal;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    public static class AspectSignal{
        private String code;

        private String name;

        @NotNull(message = "signal type cannot be empty")
        private SignalKey signalKey;

        @NotNull(message = "confident level cannot be empty")
        @DecimalMin(value = "0.0", message = "minimal value is 0.0")
        @DecimalMax(value = "100.0", message = "maximal value is 100.0")
        private Float confidentLevel;

        private String description;

    }
}

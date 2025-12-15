package com.github.api.repository.database.entity;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.github.api.base.BaseEntity;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="indicators")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
public class Indicator extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "indicators_id_seq")
    @SequenceGenerator(name = "indicators_id_seq", sequenceName = "indicators_id_seq", allocationSize = 1)
    private Long id;

    private String code;

    private String title;

    private String description;

    @JoinColumn(name = "category_id")
    @ManyToOne
    private IndicatorCategory categoryId;

    private Float weight;

    @OneToMany(mappedBy = "indicatorId", fetch = FetchType.LAZY)
    private List<IndicatorAspect> aspects;

    private Boolean isActive;
}

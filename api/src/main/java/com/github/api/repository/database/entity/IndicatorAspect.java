package com.github.api.repository.database.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.github.api.base.BaseEntity;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="indicator_aspects")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
public class IndicatorAspect extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "indicator_aspects_id_seq")
    @SequenceGenerator(name = "indicator_aspects_id_seq", sequenceName = "indicator_aspects_id_seq", allocationSize = 1)
    private Long id;

    private String code;

    private String name;

    private Float weight;

    private String description;


    @ManyToOne
    @JoinColumn(name = "indicator_id")
    private Indicator indicatorId;

    @OneToMany(mappedBy = "aspectId", fetch = FetchType.LAZY)
    private List<AspectSignal> aspectSignal;
}

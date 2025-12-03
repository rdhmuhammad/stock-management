package com.github.api.repository.database.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.github.api.base.BaseEntity;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="indicator_categories")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
public class IndicatorCategory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "indicator_categories_id_seq")
    @SequenceGenerator(name = "indicator_categories_id_seq", sequenceName = "indicator_categories_id_seq", allocationSize = 1)
    private Long id;

    private String code;

    private String name;
}

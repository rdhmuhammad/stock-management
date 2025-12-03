package com.github.api.repository.database.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.github.api.base.BaseEntity;
import lombok.Data;
import org.hibernate.annotations.ManyToAny;

import javax.persistence.*;


@Entity
@Table(name="aspect_signals")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
public class AspectSignal extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "aspect_signals_id_seq")
    @SequenceGenerator(name = "aspect_signals_id_seq", sequenceName = "aspect_signals_id_seq", allocationSize = 1)
    private Long id;

    private String code;

    private String name;

    private String signalKey;

    private Float confidentLevel;

    private String description;

    @JoinColumn(name = "aspectId")
    @ManyToOne
    private IndicatorAspect aspectId;
}

package com.github.api.repository.database.entity;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.github.api.base.BaseEntity;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="companies")
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@Data
public class Company extends BaseEntity {
    @Id
    private Long id;

    private String name;

    private String companyId;

    private String companyName;


}

package com.github.api.repository.database.repository;

import com.github.api.base.BaseRepository;
import com.github.api.repository.database.entity.IndicatorCategory;
import org.springframework.data.jpa.repository.EntityGraph;

import java.util.List;
import java.util.Optional;

public interface IndicatorCategoryRepository extends BaseRepository<IndicatorCategory, Long> {

    Optional<IndicatorCategory> findOneByCode(String code);
}

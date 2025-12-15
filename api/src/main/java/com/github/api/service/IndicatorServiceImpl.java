package com.github.api.service;

import com.github.api.base.AppService;
import com.github.api.base.ServiceResolver;
import com.github.api.common.exception.NotFoundException;
import com.github.api.repository.api.request.CreateIndicatorRequest;
import com.github.api.repository.api.request.IndicatorPageRequest;
import com.github.api.repository.database.entity.AspectSignal;
import com.github.api.repository.database.entity.Indicator;
import com.github.api.repository.database.entity.IndicatorAspect;
import com.github.api.repository.database.entity.IndicatorCategory;
import com.github.application.util.StringUtil;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class IndicatorServiceImpl extends AppService implements IndicatorService {


    @Override
    @Transactional
    public void create(CreateIndicatorRequest request) {
        Indicator copy = beanCopy.copy(request, Indicator.class);

        IndicatorCategory category = categoryRepository.findOneByCode(request.getCategoryCode())
                .orElseThrow(() -> new NotFoundException("Category not found"));
        copy.setCategoryId(category);

        copy.setCode(StringUtil.generateCode("Indc-"));
        indicatorRepository.save(created(copy));


        List<IndicatorAspect> aspects = beanCopy.copyCollection(request.getAspects(), IndicatorAspect.class);
        aspects.forEach(aspect -> {
            aspect.setIndicatorId(copy);
            aspect.setCode(StringUtil.generateCode("Aspc-"));
        });

        aspectRepository.saveAll(created(aspects));

        List<AspectSignal> signals = new ArrayList<>();

        Map<IndicatorAspect, List<CreateIndicatorRequest.AspectSignal>> signalInputs =
                aspects
                        .stream()
                        .collect(Collectors.toMap(
                                (idc -> idc),
                                indicator -> request.getAspects()
                                        .stream().filter(req -> req.getName().equals(indicator.getName()))
                                        .flatMap((req) -> req.getSignal().stream())
                                        .collect(Collectors.toList())
                        ));

        signalInputs.forEach((key, val) -> {
            List<AspectSignal> signal = new ArrayList<>();
            for (CreateIndicatorRequest.AspectSignal sg : val) {
                AspectSignal copied = beanCopy.copy(sg, AspectSignal.class);
                copied.setAspectId(key);
                copied.setSignalKey(sg.getName().toUpperCase());
                copied.setCode(StringUtil.generateCode("Sign-"));
                signal.add(copied);
            }
            signals.addAll(signal);
        });

        signalRepository.saveAll(created(signals));
    }

    public ServiceResolver<Page<Indicator>> getPaged(IndicatorPageRequest request) {
        Page<Indicator> indicatorPage = indicatorRepository.findAll(
                pageRequestSpec(request, Indicator.class, "title", "description")
                        .and(dateRangeSpec(request.getStartDate(), request.getEndDate(), Indicator.class))
                        .and((root, query, criteriaBuilder) -> {
                            List<Predicate> predicates = new ArrayList<>();
                            if (Objects.nonNull(request.getStatus()))
                                predicates.add(criteriaBuilder.equal(root.get("isActive"), request.getStatus()));

                            if (!StringUtil.IsNullOrEmpty(request.getCategory())) {
                                Join<IndicatorCategory, Indicator> categoryJoin = root.join("categoryId", JoinType.INNER);
                                predicates.add(criteriaBuilder.equal(categoryJoin.get("code"), request.getCategory()));
                            }

                            return !predicates.isEmpty() ? criteriaBuilder.and(predicates.toArray(new Predicate[0])) : null;
                        })
                , request.pageRequest());
        return success(indicatorPage);
    }

    public ServiceResolver<List<IndicatorCategory>> categoryDropdown() {
        List<IndicatorCategory> categories = indicatorCategoryRepository.findAll();
        return success(categories);
    }
}

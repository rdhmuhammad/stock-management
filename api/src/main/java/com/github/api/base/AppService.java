package com.github.api.base;

import com.github.api.base.request.BasePageRequest;
import com.github.api.common.constant.AppConstants;
import com.github.api.common.constant.PropertyHolder;
import com.github.api.repository.database.repository.*;
import com.github.application.util.BeanCopy;
import com.github.application.util.StringUtil;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Slf4j
public class AppService extends BaseService {

    // ================= Util ===========================
    @Autowired
    protected BeanCopy beanCopy;


    // ================= Repository =====================

    @Autowired
    protected IndicatorRepository indicatorRepository;

    @Autowired
    protected IndicatorCategoryRepository indicatorCategoryRepository;


    @Autowired
    protected IndicatorCategoryRepository categoryRepository;

    @Autowired
    protected IndicatorAspectRepository aspectRepository;

    @Autowired
    protected AspectSignalRepository signalRepository;

    @Autowired
    protected PropertyHolder propertyHolder;


    public AppService() {
        setSuccess(AppConstants.Message.DEFAULT_SUCCESS);
        setError(AppConstants.Message.DEFAULT_ERROR);
    }

    // ================= Base Spec =====================
    protected <T> Specification<T> dateRangeSpec(Date startDate, Date endDate, Class<T> clazzEntity) {
        return (root, query, criteriaBuilder) -> {
            if (!Objects.isNull(startDate) && !Objects.isNull(endDate)) {
                return criteriaBuilder.between(root.get("createdDate"), startDate, endDate);
            }else if (!Objects.isNull(startDate)) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("createdDate"), startDate);
            }else if (!Objects.isNull(endDate)) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("createdDate"), endDate);
            }else {
                return null;
            }
        };
    }

    protected <T> Specification<T> pageRequestSpec(BasePageRequest request, Class<T> clazzEntity, String... searchCols) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (!StringUtil.IsNullOrEmpty(request.getSearch())) {
                List<Predicate> lp = new ArrayList<>();
                for (String searchCol : searchCols) {
                    Predicate like = criteriaBuilder.like(criteriaBuilder.lower(root.get(searchCol)), "%" + request.getSearch().toLowerCase() + "%");
                    lp.add(like);
                }
                predicates.add(criteriaBuilder.or(lp.toArray(new Predicate[0])));
            }
            if (!predicates.isEmpty()) {
                return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
            }else {
                return null;
            }
        };
    }

}

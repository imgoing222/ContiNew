package com.btt.continew.house.domain;

import static com.btt.continew.house.domain.QHouse.house;
import static com.btt.continew.house.domain.QHouseOption.houseOption;
import static com.btt.continew.house.domain.QOption.option;
import static org.springframework.util.StringUtils.hasText;

import com.btt.continew.house.controller.dto.request.HouseListRequest;
import com.btt.continew.house.controller.dto.response.HouseSimpleResponse;
import com.btt.continew.house.controller.dto.response.QHouseSimpleResponse;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

@Repository
public class HouseRepositorySupport extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;
    private final HouseOptionRepository houseOptionRepository;

    public HouseRepositorySupport(JPAQueryFactory jpaQueryFactory, HouseOptionRepository houseOptionRepository) {
        super(House.class);
        this.jpaQueryFactory = jpaQueryFactory;
        this.houseOptionRepository = houseOptionRepository;
    }

    public List<HouseSimpleResponse> findHousesByLatitude(HouseListRequest request) {
        // 이미지 한장 포함
        return jpaQueryFactory
            .select(new QHouseSimpleResponse(
                house.id,
                house.deposit,
                house.monthlyRent,
                house.houseType,
                house.sidoName,
                house.gunguName,
                house.dongName,
                house.jibunAddress,
                house.addressDetail,
                house.latitude,
                house.longitude,
                house.description
            ))
            .from(house)
            .where(house.latitude.between(request.getYTop(), request.getYBottom()),
                house.longitude.between(request.getXLeft(), request.getXRight()),
                houseTypeEq(request.getHouseType()),
                house.deposit.between(request.getMinDeposit(), request.getMaxDeposit()),
                house.monthlyRent.between(request.getMinMonthlyRent(), request.getMaxMonthlyRent()),
                house.maintenanceFee.between(request.getMinMaintenanceFee(), request.getMaxMaintenanceFee()),
                optionsEq(request.getOptions())
                )
            .fetch();
    }

    private BooleanExpression houseTypeEq(String houseType) {
        return hasText(houseType) ? house.houseType.eq(houseType) : null;
    }
}
package com.btt.continew.house.domain;

import static com.btt.continew.house.domain.QHouse.house;
import static org.springframework.util.StringUtils.hasText;

import com.btt.continew.house.controller.dto.request.HouseListRequest;
import com.btt.continew.house.controller.dto.response.HouseSimpleResponse;
import com.btt.continew.house.controller.dto.response.QHouseSimpleResponse;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

@Repository
public class HouseRepositorySupport extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;
    private final HouseOptionRepository houseOptionRepository;

    public HouseRepositorySupport(JPAQueryFactory jpaQueryFactory, HouseOptionRepository houseOptionRepository) {
        super(House.class);
        this.jpaQueryFactory = jpaQueryFactory;
        this.houseOptionRepository = houseOptionRepository;
    }

    public Page<HouseSimpleResponse> findHouses(HouseListRequest request, Pageable pageable) {
        // 이미지 한장 포함
        List<HouseSimpleResponse> responses = jpaQueryFactory
            .select(new QHouseSimpleResponse(
                house.id,
                house.deposit,
                house.monthlyRent,
                house.saleType,
                house.houseType,
                house.contractType,
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
            .where(house.latitude.between(request.getYBottom(), request.getYTop()),
                house.longitude.between(request.getXLeft(), request.getXRight()),
                houseTypeEq(request.getHouseType()),
                house.deposit.between(request.getMinDeposit(), request.getMaxDeposit()),
                house.monthlyRent.between(request.getMinMonthlyRent(), request.getMaxMonthlyRent()),
                house.maintenanceFee.between(request.getMinMaintenanceFee(), request.getMaxMaintenanceFee()),
                optionsEq(request.getOptions())
                )
            .fetch();

        JPAQuery<House> countQuery = jpaQueryFactory
            .selectFrom(house)
            .where(house.latitude.between(request.getYBottom(), request.getYTop()),
                house.longitude.between(request.getXLeft(), request.getXRight()),
                houseTypeEq(request.getHouseType()),
                house.deposit.between(request.getMinDeposit(), request.getMaxDeposit()),
                house.monthlyRent.between(request.getMinMonthlyRent(), request.getMaxMonthlyRent()),
                house.maintenanceFee.between(request.getMinMaintenanceFee(), request.getMaxMaintenanceFee()),
                optionsEq(request.getOptions())
            );

        return PageableExecutionUtils.getPage(responses, pageable, () -> countQuery.fetch().size());
    }

    private BooleanExpression houseTypeEq(String houseType) {
        return hasText(houseType) ? house.houseType.eq(houseType) : null;
    }

    private BooleanBuilder optionsEq(List<Long> optionIds){
        BooleanBuilder builder = new BooleanBuilder();
        List<HouseOption> houseOptions;
        if(!optionIds.isEmpty()) {
            houseOptions = houseOptionRepository.findAllById(optionIds);
            for(HouseOption houseOption: houseOptions) {
                builder.and(house.options.contains(houseOption));
            }
        }
        return builder;
    }
}
package com.btt.continew.house.domain;

import static com.btt.continew.house.domain.QHouse.house;
import static org.springframework.util.StringUtils.hasText;

import com.btt.continew.house.controller.dto.request.HouseListRequest;
import com.btt.continew.house.controller.dto.response.HouseLocationResponse;
import com.btt.continew.house.controller.dto.response.HouseSimpleResponse;
import com.btt.continew.house.controller.dto.response.QHouseLocationResponse;
import com.btt.continew.house.controller.dto.response.QHouseSimpleResponse;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

@Repository
public class HouseRepositorySupport extends QuerydslRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;

    private static final int MAX_PERIOD = 12;

    public HouseRepositorySupport(JPAQueryFactory jpaQueryFactory) {
        super(House.class);
        this.jpaQueryFactory = jpaQueryFactory;
    }

    public Page<HouseSimpleResponse> findHouses(HouseListRequest request, Pageable pageable) {
        // 이미지 한장 포함
        QueryResults<HouseSimpleResponse> responses = jpaQueryFactory
            .select(new QHouseSimpleResponse(
                house.id,
                house.deposit,
                house.monthlyRent,
                house.maintenanceFee,
                house.saleType,
                house.houseType,
                house.contractType,
                house.sidoName,
                house.gunguName,
                house.dongName,
                house.jibunAddress,
                house.addressDetail,
                house.floor,
                house.latitude,
                house.longitude,
                house.description,
                house.mainImage
            ))
            .from(house)
            .where(house.latitude.between(request.getYBottom(), request.getYTop()),
                house.longitude.between(request.getXLeft(), request.getXRight()),
                saleTypeEq(request.getSaleType()),
                houseTypeEq(request.getHouseType()),
                contractTypeEq(request.getContractType()),
                depositBetween(request.getMinDeposit(), request.getMaxDeposit()),
                monthlyRentBetween(request.getMinMonthlyRent(), request.getMaxMonthlyRent()),
                maintenanceFeeBetween(request.getMinMaintenanceFee(), request.getMaxMaintenanceFee()),
                periodEq(request.getPeriod()),
                optionsEq(request.getOptions()),
                house.expiredAt.after(LocalDateTime.now()),
                house.deletedAt.isNull()
                )
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetchResults();

        List<HouseSimpleResponse> content = responses.getResults();

        JPAQuery<House> countQuery = jpaQueryFactory
            .selectFrom(house)
            .where(house.latitude.between(request.getYBottom(), request.getYTop()),
                house.longitude.between(request.getXLeft(), request.getXRight()),
                saleTypeEq(request.getSaleType()),
                houseTypeEq(request.getHouseType()),
                contractTypeEq(request.getContractType()),
                depositBetween(request.getMinDeposit(), request.getMaxDeposit()),
                monthlyRentBetween(request.getMinMonthlyRent(), request.getMaxMonthlyRent()),
                maintenanceFeeBetween(request.getMinMaintenanceFee(), request.getMaxMaintenanceFee()),
                periodEq(request.getPeriod()),
                optionsEq(request.getOptions()),
                house.expiredAt.after(LocalDateTime.now()),
                house.deletedAt.isNull()
            );

        return PageableExecutionUtils.getPage(content, pageable, () -> countQuery.fetch().size());
    }

    public List<HouseLocationResponse> findAllHouses(HouseListRequest request) {
        List<HouseLocationResponse> responses = jpaQueryFactory
            .select(new QHouseLocationResponse(
                house.latitude,
                house.longitude
            ))
            .from(house)
            .where(house.latitude.between(request.getYBottom(), request.getYTop()),
                house.longitude.between(request.getXLeft(), request.getXRight()),
                saleTypeEq(request.getSaleType()),
                houseTypeEq(request.getHouseType()),
                contractTypeEq(request.getContractType()),
                depositBetween(request.getMinDeposit(), request.getMaxDeposit()),
                monthlyRentBetween(request.getMinMonthlyRent(), request.getMaxMonthlyRent()),
                maintenanceFeeBetween(request.getMinMaintenanceFee(), request.getMaxMaintenanceFee()),
                periodEq(request.getPeriod()),
                optionsEq(request.getOptions()),
                house.expiredAt.after(LocalDateTime.now()),
                house.deletedAt.isNull()
            )
            .fetch();
        return responses;
    }

    private BooleanExpression depositBetween(Long minDeposit, Long maxDeposit) {
        if (Objects.nonNull(minDeposit) && Objects.nonNull(maxDeposit)) {
            return house.deposit.between(minDeposit, maxDeposit);
        }
        if (Objects.nonNull(minDeposit)) {
            return house.deposit.goe(minDeposit);
        }
        if (Objects.nonNull(maxDeposit)) {
            return house.deposit.lt(maxDeposit);
        }
        return house.deposit.goe(0);
    }

    private BooleanExpression monthlyRentBetween(Long minRent, Long maxRent) {
        if (Objects.nonNull(minRent) && Objects.nonNull(maxRent)) {
            return house.monthlyRent.between(minRent, maxRent);
        }
        if (Objects.nonNull(minRent)) {
            return house.monthlyRent.goe(minRent);
        }
        if (Objects.nonNull(maxRent)) {
            return house.monthlyRent.lt(maxRent);
        }
        return house.monthlyRent.goe(0);

    }

    private BooleanExpression maintenanceFeeBetween(Long minFee, Long maxFee) {
        if (Objects.nonNull(minFee) && Objects.nonNull(maxFee)) {
            return house.maintenanceFee.between(minFee, maxFee);
        }
        if (Objects.nonNull(minFee)) {
            return house.maintenanceFee.goe(minFee);
        }
        if (Objects.nonNull(maxFee)) {
            return house.maintenanceFee.lt(maxFee);
        }
        return house.maintenanceFee.goe(0);
    }

    private BooleanExpression saleTypeEq(String saleType) {
        return hasText(saleType) ? house.saleType.eq(saleType) : null;
    }

    private BooleanExpression houseTypeEq(String houseType) {
        return hasText(houseType) ? house.houseType.eq(houseType) : null;
    }

    private BooleanExpression contractTypeEq(String contractType) {
        return hasText(contractType) ? house.contractType.eq(contractType) : null;
    }

    private BooleanExpression periodEq(Integer period) {
        if (Objects.nonNull(period)) {
            if (period > MAX_PERIOD) {
                return house.period.goe(MAX_PERIOD);
            }
            return house.period.lt(period);
        }
        return null;
    }

    private BooleanBuilder optionsEq(List<Long> options){
        BooleanBuilder builder = new BooleanBuilder();
        if(Objects.nonNull(options)) {
            String[] optionsRequest = options.toString().substring(1, options.toString().length()-1).split(", ");
            for(String option: optionsRequest) {
                builder.and(house.options.contains(option));
            }
        }
        return builder;
    }
}
package com.btt.continew.house.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HouseListRequest {

    @ApiModelProperty(name = "y_bottom", position = 0, example = "33.448093757167825")
    @JsonProperty("y_bottom")
    private Double yBottom;

    @ApiModelProperty(name = "y_top", position = 1, example = "33.45451311326508")
    @JsonProperty("y_top")
    private Double yTop;

    @ApiModelProperty(name = "x_left", position = 2, example = "126.55492857215698")
    @JsonProperty("x_left")
    private Double xLeft;

    @ApiModelProperty(name = "x_right", position = 3, example = "126.58615245267431")
    @JsonProperty("x_right")
    private Double xRight;

    @ApiModelProperty(name = "sale_type", position = 4, example = "이어살기")
    @JsonProperty("sale_type")
    private String saleType;

    @ApiModelProperty(name = "house_type", position = 5, example = "원룸")
    @JsonProperty("house_type")
    private String houseType;

    @ApiModelProperty(name = "contract_type", position = 6, example = "전세")
    @JsonProperty("contract_type")
    private String contractType;

    @ApiModelProperty(name = "min_deposit", position = 6, example = "3000000")
    @JsonProperty("min_deposit")
    private Long minDeposit;

    @ApiModelProperty(name = "max_deposit", position = 7, example = "500000000")
    @JsonProperty("max_deposit")
    private Long maxDeposit;

    @ApiModelProperty(name = "min_monthly_rent", position = 8, example = "200000")
    @JsonProperty("min_monthly_rent")
    private Long minMonthlyRent;

    @ApiModelProperty(name = "max_monthly_rent", position = 9, example = "5000000")
    @JsonProperty("max_monthly_rent")
    private Long maxMonthlyRent;

    @ApiModelProperty(name = "min_maintenance_fee", position = 10, example = "10000")
    @JsonProperty("min_maintenance_fee")
    private Long minMaintenanceFee;

    @ApiModelProperty(name = "max_maintenance_fee", position = 11, example = "200000")
    @JsonProperty("max_maintenance_fee")
    private Long maxMaintenanceFee;

    @ApiModelProperty(name = "period", position = 12, example = "6")
    @JsonProperty("period")
    private Integer period;

    @ApiModelProperty(name = "options", position = 13, example = "[1, 2, 3]")
    @JsonProperty("options")
    private List<Long> options;

    public HouseListRequest() {
    }

    public HouseListRequest(Double yBottom, Double yTop, Double xLeft, Double xRight, String saleType, String houseType,
        String contractType, Long minDeposit, Long maxDeposit, Long minMonthlyRent, Long maxMonthlyRent,
        Long minMaintenanceFee, Long maxMaintenanceFee, Integer period, List<Long> options) {
        this.yBottom = yBottom;
        this.yTop = yTop;
        this.xLeft = xLeft;
        this.xRight = xRight;
        this.saleType = saleType;
        this.houseType = houseType;
        this.contractType = contractType;
        this.minDeposit = minDeposit;
        this.maxDeposit = maxDeposit;
        this.minMonthlyRent = minMonthlyRent;
        this.maxMonthlyRent = maxMonthlyRent;
        this.minMaintenanceFee = minMaintenanceFee;
        this.maxMaintenanceFee = maxMaintenanceFee;
        this.period = period;
        this.options = options;
    }
}

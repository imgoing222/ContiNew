package com.btt.continew.house.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import lombok.Getter;

@Getter
public class HouseSaveRequest {

    @ApiModelProperty(name = "sido_name", position = 0, example = "경기도")
    @JsonProperty("sido_name")
    private String sidoName;

    @ApiModelProperty(name = "gungu_name", position = 1, example = "광명시")
    @JsonProperty("gunguName")
    private String gunguName;

    @ApiModelProperty(name = "dong_name", position = 2, example = "소하동 1363")
    @JsonProperty("dongName")
    private String dongName;

    @ApiModelProperty(name = "road_name", position = 3, example = "신촌로 49")
    @JsonProperty("roadName")
    private String roadName;

    @ApiModelProperty(name = "address_detail", position = 4, example = "108동")
    @JsonProperty("address_detail")
    private String addressDetail;

    @ApiModelProperty(name = "floor", position = 5, example = "5")
    @JsonProperty("floor")
    private Integer floor;

    @ApiModelProperty(name = "trade_type", position = 6, example = "이어살기")
    @JsonProperty("trade_type")
    private String tradeType;

    @ApiModelProperty(name = "house_type", position = 7, example = "원룸")
    @JsonProperty("house_type")
    private String houseType;

    @ApiModelProperty(name = "deposit", position = 8, example = "10000000")
    @JsonProperty("deposit")
    private Long deposit;

    @ApiModelProperty(name = "monthly_rent", position = 9, example = "500000")
    @JsonProperty("monthly_rent")
    private Long montylyRent;

    @ApiModelProperty(name = "maintenance_fee", position = 10, example = "50000")
    @JsonProperty("maintenance_fee")
    private Long maintenanceFee;

    @ApiModelProperty(name = "maintenance_detail", position = 11, example = "전기요금")
    private String maintenanceDetail;

    @ApiModelProperty(name = "period", position = 12, example = "6")
    @JsonProperty("period")
    private Integer period;

    @ApiModelProperty(name = "description", position = 13, example = "교환학생 가게 되어서 6개월 살고 급하게 내놓습니다 위치 좋고 남향에다가 어쩌고저쩌고")
    @JsonProperty("description")
    private String description;

    @ApiModelProperty(name = "option", position = 14, example = "[1,2,3]")
    @JsonProperty("options")
    private List<Long> options;

    public HouseSaveRequest() {
    }

    public HouseSaveRequest(String sidoName, String gunguName, String dongName, String roadName, String addressDetail,
        Integer floor, String tradeType, String houseType, Long deposit, Long montylyRent, Long maintenanceFee,
        String maintenanceDetail, Integer period, String description, List<Long> options) {
        this.sidoName = sidoName;
        this.gunguName = gunguName;
        this.dongName = dongName;
        this.roadName = roadName;
        this.addressDetail = addressDetail;
        this.floor = floor;
        this.tradeType = tradeType;
        this.houseType = houseType;
        this.deposit = deposit;
        this.montylyRent = montylyRent;
        this.maintenanceFee = maintenanceFee;
        this.maintenanceDetail = maintenanceDetail;
        this.period = period;
        this.description = description;
        this.options = options;
    }
}

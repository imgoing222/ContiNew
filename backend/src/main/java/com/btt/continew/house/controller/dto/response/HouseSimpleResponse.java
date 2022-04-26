package com.btt.continew.house.controller.dto.response;

import com.btt.continew.house.domain.House;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class HouseSimpleResponse {

    @JsonProperty("house_id")
    @ApiModelProperty(position = 0, notes = "매물 id", example = "1")
    private Long id;

    @JsonProperty("deposit")
    @ApiModelProperty(position = 1, notes = "보증금", example = "10000000")
    private Long deposit;

    @JsonProperty("monthly_rent")
    @ApiModelProperty(position = 2, notes = "월세", example = "500000")
    private Long monthlyRent;

    @JsonProperty("house_type")
    @ApiModelProperty(position = 3, notes = "매물 유형", example = "원룸")
    private String houseType;

    @JsonProperty("sido_name")
    @ApiModelProperty(position = 4, notes = "시/도명", example = "서울")
    private String sidoName;

    @JsonProperty("gungu_name")
    @ApiModelProperty(position = 5, notes = "시/군/구명", example = "동대문구")
    private String gunguName;

    @JsonProperty("dong_name")
    @ApiModelProperty(position = 6, notes = "동/읍/면명", example = "이문동")
    private String dongName;

    @JsonProperty("jibun_address")
    @ApiModelProperty(position = 7, notes = "지번 주소", example = "서울 동대문구 이문동 264-295")
    private String jibunAddress;

    @JsonProperty("address_detail")
    @ApiModelProperty(position = 8, notes = "상세주소", example = "스카이빌")
    private String addressDetail;

    @JsonProperty("latitude")
    @ApiModelProperty(position = 9, notes = "위도", example = "33.448093757167825")
    private Long latitude;

    @JsonProperty("longitude")
    @ApiModelProperty(position = 10, notes = "경도", example = "126.55492857215698")
    private Long longitude;

    @JsonProperty("description")
    @ApiModelProperty(position = 11, notes = "상세설명", example = "입대하게 되어서 방 내놓습니다...")
    private String description;

    public HouseSimpleResponse() {
    }

    public HouseSimpleResponse(Long id, Long deposit, Long monthlyRent, String houseType, String sidoName, String gunguName,
        String dongName, String jibunAddress, String addressDetail, Long latitude, Long longitude, String description) {
        this.id = id;
        this.deposit = deposit;
        this.monthlyRent = monthlyRent;
        this.houseType = houseType;
        this.sidoName = sidoName;
        this.gunguName = gunguName;
        this.dongName = dongName;
        this.jibunAddress = jibunAddress;
        this.addressDetail = addressDetail;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
    }

    public static HouseSimpleResponse from(House house) {
        return new HouseSimpleResponse(
            house.getId(),
            house.getDeposit(),
            house.getMonthlyRent(),
            house.getHouseType(),
            house.getSidoName(),
            house.getGunguName(),
            house.getDongName(),
            house.getJibunAddress(),
            house.getAddressDetail(),
            house.getLatitude(),
            house.getLongitude(),
            house.getDescription()
        );
    }
}

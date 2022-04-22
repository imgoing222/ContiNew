package com.btt.continew.house.controller.dto.response;

import com.btt.continew.house.domain.House;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import javax.persistence.Column;
import lombok.Getter;

@Getter
public class HouseSimpleResponse {

    @JsonProperty("house_id")
    @ApiModelProperty(position = 0, notes = "매물 id", example = "1")
    private Long id;

    @JsonProperty("deposit")
    @ApiModelProperty(position = 1, notes = "보증금", example = "10000000")
    private Long deposit;

    @JsonProperty("montyly_rent")
    @ApiModelProperty(position = 2, notes = "월세", example = "500000")
    private Long monthlyRent;

    @JsonProperty("house_type")
    @ApiModelProperty(position = 3, notes = "매물 유형", example = "원룸")
    private String houseType;

    @JsonProperty("sido_name")
    @ApiModelProperty(position = 4, notes = "시/도명", example = "경기도")
    private String sidoName;

    @JsonProperty("gungu_name")
    @ApiModelProperty(position = 5, notes = "시/군/구명", example = "광명시")
    private String gunguName;

    @JsonProperty("dong_name")
    @ApiModelProperty(position = 6, notes = "동/읍/면명", example = "소하동")
    private String dongName;

    @JsonProperty("road_name")
    @ApiModelProperty(position = 7, notes = "도로명", example = "신촌로 49")
    private String roadName;

}

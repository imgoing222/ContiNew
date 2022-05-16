package com.btt.continew.house.controller.dto.response;

import com.btt.continew.house.domain.House;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.querydsl.core.annotations.QueryProjection;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class HouseLocationResponse {

    @JsonProperty("latitude")
    @ApiModelProperty(name = "위도", example = "33.448093757167825")
    private Double latitude;

    @JsonProperty("longitude")
    @ApiModelProperty(position = 1, name = "경도", example = "126.55492857215698")
    private Double longitude;

    public HouseLocationResponse() {

    }

    @QueryProjection
    public HouseLocationResponse(Double latitude, Double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public static HouseLocationResponse from(House house) {
        return new HouseLocationResponse(
            house.getLatitude(),
            house.getLongitude()
        );
    }
}

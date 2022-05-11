package com.btt.continew.house.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class HouseAroundRequest {

    @ApiModelProperty(name = "sido_name", position = 0, example = "서울")
    @JsonProperty("sido_name")
    private String sidoName;

    @ApiModelProperty(name = "gungu_name", position = 1, example = "동대문구")
    @JsonProperty("gungu_name")
    private String gunguName;

    @ApiModelProperty(name = "dong_name", position = 2, example = "이문동")
    @JsonProperty("dong_name")
    private String dongName;

    public HouseAroundRequest() {
    }

    public HouseAroundRequest(String sidoName, String gunguName, String dongName) {
        this.sidoName = sidoName;
        this.gunguName = gunguName;
        this.dongName = dongName;
    }
}

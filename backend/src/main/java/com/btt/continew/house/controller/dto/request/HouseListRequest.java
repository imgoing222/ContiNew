package com.btt.continew.house.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class HouseListRequest {

    @ApiModelProperty(example = "33.448093757167825", notes = "위도 남쪽")
    @JsonProperty("y_bottom")
    private Long yBottom;

    @ApiModelProperty(position = 1, example = "33.45451311326508", notes = "위도 북쪽")
    @JsonProperty("y_top")
    private Long yTop;

    @ApiModelProperty(position = 2, example = "126.55492857215698", notes = "경도 서쪽")
    @JsonProperty("x_left")
    private Long xLeft;

    @ApiModelProperty(position = 3, example = "126.58615245267431", notes = "경도 동쪽")
    @JsonProperty("x_right")
    private Long xRight;

    public HouseListRequest() {
    }

    public HouseListRequest(Long yBottom, Long yTop, Long xLeft, Long xRight) {
        this.yBottom = yBottom;
        this.yTop = yTop;
        this.xLeft = xLeft;
        this.xRight = xRight;
    }
}

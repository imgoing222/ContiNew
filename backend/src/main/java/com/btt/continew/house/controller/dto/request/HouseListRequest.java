package com.btt.continew.house.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HouseListRequest {

    @ApiModelProperty(name = "y_bottom", position = 0, example = "33.448093757167825")
    @JsonProperty("y_bottom")
    private Long yBottom;

    @ApiModelProperty(name = "y_top", position = 1, example = "33.45451311326508")
    @JsonProperty("y_top")
    private Long yTop;

    @ApiModelProperty(name = "x_left", position = 2, example = "126.55492857215698")
    @JsonProperty("x_left")
    private Long xLeft;

    @ApiModelProperty(name = "x_right", position = 3, example = "126.58615245267431")
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

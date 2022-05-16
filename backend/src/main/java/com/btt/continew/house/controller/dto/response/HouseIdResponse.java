package com.btt.continew.house.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class HouseIdResponse {

    @JsonProperty("house_id")
    @ApiModelProperty(notes = "매물 id", example = "1")
    private Long id;

    public HouseIdResponse() {

    }

    public HouseIdResponse(Long id) {
        this.id = id;
    }
}

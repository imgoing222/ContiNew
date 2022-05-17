package com.btt.continew.house.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class HouseLikeResponse {

    @JsonProperty("is_liked")
    private Boolean isLiked;

    public HouseLikeResponse() {
    }

    public HouseLikeResponse(Boolean isLiked) {
        this.isLiked = isLiked;
    }
}

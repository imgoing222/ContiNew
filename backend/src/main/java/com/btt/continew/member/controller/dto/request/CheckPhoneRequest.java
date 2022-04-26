package com.btt.continew.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class CheckPhoneRequest {

    @ApiModelProperty(position = 1, notes = "인증 번호", example = "yC3Hd8")
    @JsonProperty("code")
    private String code;

    public CheckPhoneRequest() {
    }

    public CheckPhoneRequest(String code) {
        this.code = code;
    }
}

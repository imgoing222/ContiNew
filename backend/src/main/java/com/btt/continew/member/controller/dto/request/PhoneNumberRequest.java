package com.btt.continew.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class PhoneNumberRequest {

    @ApiModelProperty(name = "휴대폰 번호")
    @JsonProperty("phone_number")
    private String phoneNumber;

    public PhoneNumberRequest() {
    }

    public PhoneNumberRequest(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}

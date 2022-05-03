package com.btt.continew.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class ChangePwSendRequest {

    @ApiModelProperty(position = 1, notes = "로그인 아이디", example = "continew123")
    @JsonProperty("login_id")
    private String loginId;

    @ApiModelProperty(position = 2, notes = "전화번호", example = "01015771577")
    @JsonProperty("phone_number")
    private String phoneNumber;

    public ChangePwSendRequest() {
    }

    public ChangePwSendRequest(String loginId, String phoneNumber) {
        this.loginId = loginId;
        this.phoneNumber = phoneNumber;
    }
}

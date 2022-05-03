package com.btt.continew.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class FindPwChangeRequest {

    @ApiModelProperty(position = 1, notes = "비밀번호 변경 토큰", example = "hcT2TGS64fd7")
    @JsonProperty("change_token")
    private String changeToken;

    @ApiModelProperty(position = 2, notes = "새 비밀번호", example = "Newzjsxlsb123!!")
    @JsonProperty("new_password")
    private String newPassword;

    public FindPwChangeRequest() {
    }

    public FindPwChangeRequest(String changeToken, String newPassword) {
        this.changeToken = changeToken;
        this.newPassword = newPassword;
    }
}

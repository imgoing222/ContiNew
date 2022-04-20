package com.btt.continew.auth.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class LoginRequest {

    @JsonProperty("login_id")
    @ApiModelProperty(required = true, position = 0, notes = "로그인 아이디", example = "continew")
    private String loginId;

    @JsonProperty("password")
    @ApiModelProperty(required = true, position = 1, notes = "비밀번호", example = "Zjsxlsb123!!")
    private String password;

    public LoginRequest() {
    }

    public LoginRequest(String loginId, String password) {
        this.loginId = loginId;
        this.password = password;
    }
}

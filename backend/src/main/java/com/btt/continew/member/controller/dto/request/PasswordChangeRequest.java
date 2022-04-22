package com.btt.continew.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class PasswordChangeRequest {

    @ApiModelProperty(position = 1, notes = "이전 비밀번호", example = "Zjsxlsb123!!")
    @JsonProperty("before_password")
    private String beforePassword;

    @ApiModelProperty(position = 2, notes = "새 비밀번호", example = "Newzjsxlsb123!!")
    @JsonProperty("new_password")
    private String newPassword;

}

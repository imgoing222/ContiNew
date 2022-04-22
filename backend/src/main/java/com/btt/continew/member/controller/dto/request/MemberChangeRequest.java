package com.btt.continew.member.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class MemberChangeRequest {

    @ApiModelProperty(position = 1, notes = "닉네임", example = "컨티뉴")
    @JsonProperty("username")
    private String username;

    public MemberChangeRequest() {
    }

    public MemberChangeRequest(String username) {
        this.username = username;
    }
}

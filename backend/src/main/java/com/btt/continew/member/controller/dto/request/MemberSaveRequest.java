package com.btt.continew.member.controller.dto.request;

import com.btt.continew.member.domain.Member;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class MemberSaveRequest {

    @ApiModelProperty(name = "login_id", position = 0, notes = "로그인 아이디", example = "continew")
    @JsonProperty("login_id")
    private String loginId;

    @ApiModelProperty(name = "password", position = 1, notes = "비밀번호", example = "Zjsxlsb123!!")
    @JsonProperty("password")
    private String password;

    @ApiModelProperty(name = "username", position = 2, notes = "닉네임", example = "컨티뉴")
    @JsonProperty("username")
    private String username;

    public MemberSaveRequest() {
    }

    public MemberSaveRequest(String loginId, String password, String username) {
        this.loginId = loginId;
        this.password = password;
        this.username = username;
    }

    public Member toMember() {
        return Member.createMember(loginId, password, username);
    }
}
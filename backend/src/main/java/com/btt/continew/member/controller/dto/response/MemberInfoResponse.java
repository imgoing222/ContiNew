package com.btt.continew.member.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.btt.continew.member.domain.Member;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class MemberInfoResponse {

    @JsonProperty("id")
    @ApiModelProperty(position = 1, notes = "ID", example = "1")
    private Long id;

    @JsonProperty("email")
    @ApiModelProperty(position = 2, notes = "이메일", example = "continew1111@naver.com")
    private String email;

    @JsonProperty("username")
    @ApiModelProperty(position = 3, notes = "유저네임", example = "컨티뉴")
    private String username;

    @JsonProperty("phone_nunber")
    @ApiModelProperty(position = 4, notes = "전화번호", example = "01000000000")
    private String phoneNumber;

    @JsonProperty("phone_auth")
    @ApiModelProperty(position = 5, notes = "번호인증여부", example = "true")
    private Boolean phoneAuth;

    @JsonProperty("social_id")
    @ApiModelProperty(position = 6, notes = "소셜 아이디 (소셜 확인용)", example = "아직 안만듦")
    private String socialId;

    public MemberInfoResponse(Long id, String email, String username, String phoneNumber, Boolean phoneAuth, String socialId) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.phoneAuth = phoneAuth;
        this.socialId = socialId;
    }

    public static MemberInfoResponse from(Member member) {
        return new MemberInfoResponse(
            member.getId(),
            member.getLoginId(),
            member.getUsername(),
            member.getPhoneNumber(),
            member.getPhoneAuth(),
            member.getGoogleId()
        );
    }
}

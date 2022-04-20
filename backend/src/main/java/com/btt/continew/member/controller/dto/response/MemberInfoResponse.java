package com.btt.continew.member.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.btt.continew.member.domain.Member;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class MemberInfoResponse {

    @JsonProperty("id")
    @ApiModelProperty(notes = "ID", example = "1")
    private Long id;

    @JsonProperty("email")
    @ApiModelProperty(notes = "이메일", example = "loling3@naver.com")
    private String email;

    @JsonProperty("username")
    @ApiModelProperty(notes = "유저네임", example = "컨티뉴")
    private String username;

    @JsonProperty("phone_nunber")
    @ApiModelProperty(notes = "전화번호", example = "01000000000")
    private String phoneNumber;
    @JsonProperty("social_id")
    @ApiModelProperty(notes = "소셜 아이디 (소셜 확인용)", example = "")
    private String socialId;

    public MemberInfoResponse(Long id, String email, String username, String phoneNumber, String socialId) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.socialId = socialId;
    }

    public static MemberInfoResponse from(Member member) {
        return new MemberInfoResponse(
            member.getId(),
            member.getLoginId(),
            member.getUsername(),
            member.getPhoneNumber(),
            member.getGoogleId()
        );
    }
}

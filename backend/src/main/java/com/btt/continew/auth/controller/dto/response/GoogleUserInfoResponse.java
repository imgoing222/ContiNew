package com.btt.continew.auth.controller.dto.response;

import com.btt.continew.auth.domain.Authority;
import com.btt.continew.auth.domain.Provider;
import com.btt.continew.member.domain.Member;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class GoogleUserInfoResponse {

    @JsonProperty("email")
    private String email;

    @JsonProperty("name")
    private String name;

    @JsonProperty("picture")
    private String picture;

    @JsonProperty("sub")
    private String sub;

    @JsonProperty("exp")
    private String exp;

    public Member toEntity() {
        return Member.builder()
            .loginId(email)
            .username("G_" + name)
            .password(sub)
            .phoneAuth(false)
            .authority(Authority.ROLE_MEMBER)
            .provider(Provider.GOOGLE)
            .build();
    }
}

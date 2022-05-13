package com.btt.continew.auth.controller.dto.response;

import com.btt.continew.auth.domain.Authority;
import com.btt.continew.auth.domain.Provider;
import com.btt.continew.member.domain.Member;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Map;
import lombok.Getter;

@Getter
public class KakaoUserInfoResponse {

    @JsonProperty("id")
    private String id;

    @JsonProperty("properties")
    private Map<String, Object> properties;

    @JsonProperty("kakao_account")
    private Map<String, Object> kakaoAccount;

    public Member toEntity() {
        String username = (String) properties.get("nickname");

        return Member.builder()
            .loginId(username)
            .username(username)
            .password(username + id)
            .authority(Authority.ROLE_MEMBER)
            .provider((Provider.KAKAO))
            .build();
    }
}

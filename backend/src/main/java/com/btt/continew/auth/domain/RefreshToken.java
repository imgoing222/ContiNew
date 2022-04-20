package com.btt.continew.auth.domain;

import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash("refresh_token")
public class RefreshToken {

    @Id
    String id;

    String refreshToken;
    String subject;
    Authority authority;

    @Builder
    public RefreshToken(String refreshToken, String subject, Authority authority) {
        this.refreshToken = refreshToken;
        this.subject = subject;
        this.authority = authority;
    }
}

package com.btt.continew.auth.domain;

import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import java.util.concurrent.TimeUnit;
import org.springframework.data.redis.core.index.Indexed;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@RedisHash("refresh_token")
public class RefreshToken {

    @Id
    Long id;

    String refreshToken;

    @Indexed
    String subject;

    @TimeToLive(unit = TimeUnit.MILLISECONDS)
    Long timeout;

    @Builder
    public RefreshToken(String refreshToken, String subject, Long timeout) {
        this.refreshToken = refreshToken;
        this.subject = subject;
        this.timeout = timeout;
    }
}

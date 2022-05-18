package com.btt.continew.auth.domain;

import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import java.io.Serializable;
import java.util.UUID;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import java.util.concurrent.TimeUnit;
import org.springframework.data.redis.core.index.Indexed;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@Getter
@RedisHash("refresh_token")
public class RefreshToken implements Serializable {

    @Id
    String id;

    String refreshToken;

    @Indexed
    String subject;

    @TimeToLive(unit = TimeUnit.MILLISECONDS)
    Long timeout;

    @Builder
    public RefreshToken(String refreshToken, String subject, Long timeout) {
        this.id = UUID.randomUUID().toString();
        this.refreshToken = refreshToken;
        this.subject = subject;
        this.timeout = timeout;
    }

    public void validateValue(String refreshToken) {
        if (!this.refreshToken.equals(refreshToken)) {
            throw new BusinessException(ErrorCode.INVALID_NOT_MATCH_BY_REFRESH_TOKEN);
        }
    }

    public RefreshToken updateRefreshToken(String token) {
        this.refreshToken = token;
        return this;
    }
}

package com.btt.continew.auth.domain;

import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;

@Getter
@Entity
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "refresh_token_id")
    private Long id;

    @Column(name = "refresh_token", length = 512)
    private String refreshToken;

    @Column(name = "subject", length = 32)
    private String subject;

    @Column(name = "expired_at")
    private LocalDateTime expiredAt;

    public RefreshToken() {
    }

    @Builder
    public RefreshToken(String refreshToken, String subject, LocalDateTime expiredAt) {
        this.refreshToken = refreshToken;
        this.subject = subject;
        this.expiredAt = expiredAt;
    }

    public void validateValue(String refreshToken) {
        if (!this.refreshToken.equals(refreshToken)) {
            throw new BusinessException(ErrorCode.INVALID_NOT_MATCH_BY_REFRESH_TOKEN);
        }
    }

    public void updateRefreshToken(String token) {
        this.refreshToken = token;
        this.expiredAt = LocalDateTime.now().plusDays(7);
    }
}

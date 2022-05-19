package com.btt.continew.auth.domain;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findBySubject(String subject);

    int deleteByExpiredAtBefore(LocalDateTime time);
}

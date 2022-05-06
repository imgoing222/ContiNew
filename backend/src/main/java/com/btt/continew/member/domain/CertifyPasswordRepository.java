package com.btt.continew.member.domain;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface CertifyPasswordRepository extends JpaRepository<CertifyPassword, Long> {

    Optional<CertifyPassword> findByMember(Member member);

    Optional<CertifyPassword> findByCertificationCode(String certifyCode);

    Optional<CertifyPassword> findByChangeToken(String changeToken);

    Boolean existsByChangeToken(String changeToken);

    Boolean existsByCertificationCode(String certifyCode);

    int deleteByExpireTimeBefore(LocalDateTime time);

    @Modifying
    @Query(value = "update CertifyPassword cp "
        + "set cp.todayCount = 0")
    Integer updateTodayCountZero();
}

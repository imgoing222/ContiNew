package com.btt.continew.member.domain;

import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertifyPhoneRepository extends JpaRepository<CertifyPhone, Long> {

    Optional<CertifyPhone> findByMember(Member member);

    int deleteByExpireTimeBefore(LocalDateTime time);
}

package com.btt.continew.member.domain;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertifyPasswordRepository extends JpaRepository<CertifyPassword, Long> {

    Optional<CertifyPassword> findByMember(Member member);

    Optional<CertifyPassword> findByCertificationCode(String certifyCode);
}

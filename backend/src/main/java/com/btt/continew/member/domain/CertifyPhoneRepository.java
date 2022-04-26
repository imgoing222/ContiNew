package com.btt.continew.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CertifyPhoneRepository extends JpaRepository<CertifyPhone, Long> {

    int countByLoginId(String LoginId);
}

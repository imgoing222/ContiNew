package com.btt.continew.member.domain;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class CertifyPhone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "certify_phone_id")
    private Long id;

    @Column(name = "phone_number", length = 16, nullable = false)
    private String phoneNumber;

    @Column(name = "certification_code", length = 6, nullable = false)
    private String certificationCode;

    @Column(name = "login_id", length = 32, nullable = false)
    private String loginId;

    @Column(name="expire_time")
    private LocalDateTime expireTime;

    public CertifyPhone() {

    }

    @Builder
    public CertifyPhone(String phoneNumber, String certificationCode, String loginId, LocalDateTime expireTime) {
        this.phoneNumber = phoneNumber;
        this.certificationCode = certificationCode;
        this.loginId = loginId;
        this.expireTime = expireTime;
    }
}

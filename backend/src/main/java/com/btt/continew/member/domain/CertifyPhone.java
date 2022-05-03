package com.btt.continew.member.domain;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class CertifyPhone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "certify_phone_id")
    private Long id;

    @Column(name = "phone_number", length = 16)
    private String phoneNumber;

    @Column(name = "certification_code", length = 6)
    private String certificationCode;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "expire_time")
    private LocalDateTime expireTime;

    @Column(name = "today_count")
    private Integer todayCount;

    public CertifyPhone() {

    }

    @Builder
    public CertifyPhone(String phoneNumber, String certificationCode, Member member, LocalDateTime expireTime) {
        this.phoneNumber = phoneNumber;
        this.certificationCode = certificationCode;
        this.member = member;
        this.expireTime = expireTime;
        this.todayCount = 0;
    }

    public void setNewCode(String phoneNumber, String certifiedCode, LocalDateTime expireTime) {
        this.todayCount++;
        this.phoneNumber = phoneNumber;
        this.expireTime = expireTime;
        this.certificationCode = certifiedCode;
    }
}

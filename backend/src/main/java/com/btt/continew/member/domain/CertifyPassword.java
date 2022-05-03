package com.btt.continew.member.domain;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class CertifyPassword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "certify_password_id")
    private Long id;

    @Column(name = "certification_code", length = 6)
    private String certificationCode;

    @Column(name = "change_token", length = 12)
    private String changeToken;

    @Column(name = "expired")
    private Boolean expired;

    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "expire_time")
    private LocalDateTime expireTime;

    @Column(name = "today_count")
    private Integer todayCount;

    @Builder
    public CertifyPassword(String certificationCode, Member member, LocalDateTime expireTime) {
        this.certificationCode = certificationCode;
        this.expired = false;
        this.member = member;
        this.expireTime = expireTime;
        this.todayCount = 0;
    }

    public CertifyPassword() {
    }

    public void setChangeToken(String changeToken) {
        this.changeToken = changeToken;
    }

    public void setNewCode(String certificationCode, LocalDateTime expireTime) {
        this.todayCount++;
        this.certificationCode = certificationCode;
        this.changeToken = null;
        this.expired = false;
        this.expireTime = expireTime;
    }
}

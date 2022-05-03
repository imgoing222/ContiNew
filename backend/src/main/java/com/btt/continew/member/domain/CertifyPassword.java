package com.btt.continew.member.domain;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;

@Entity
@Getter
public class CertifyPassword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "certify_phone_id")
    private Long id;

    @Column(name = "certification_code", length = 6)
    private String certificationCode;

    @Column(name = "change_token", length = 12)
    private String changeToken;

    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "expire_time")
    private LocalDateTime expireTime;

    @Column(name = "today_count")
    private Integer todayCount;
}

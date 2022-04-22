package com.btt.continew.member.domain;

import com.btt.continew.auth.domain.Authority;
import com.btt.continew.global.domain.BaseEntity;
import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.btt.continew.member.controller.dto.request.PasswordChangeRequest;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "login_id", length = 32, nullable = false)
    private String loginId;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "username", length = 20, nullable = false)
    private String username;

    @Column(name = "google_id")
    private String googleId;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "phone_auth")
    private String phoneAuth;

    @Enumerated(EnumType.STRING)
    @Column(name = "authority")
    private Authority authority;

    protected Member() {
    }

    @Builder
    public Member(String loginId, String password, String username, String googleId, String phoneNumber, String phoneAuth,
        Authority authority) {
        this.loginId = loginId;
        this.password = password;
        this.username = username;
        this.googleId = googleId;
        this.phoneNumber = phoneNumber;
        this.phoneAuth = phoneAuth;
        this.authority = authority;
    }

    public static Member createMember(String loginId, String password, String username) {
        return Member.builder()
            .loginId(loginId)
            .password(password)
            .username(username)
            .authority(Authority.ROLE_MEMBER)
            .build();
    }

    public void encodePassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    public void checkPassword(PasswordEncoder passwordEncoder, String password) {
        if (!passwordEncoder.matches(password, this.password)) {
            throw new BusinessException(ErrorCode.MEMBER_LOGIN_ERROR_BY_PASSWORD);
        }
    }

    public void changeUsername(String username) {
        if (!Objects.isNull(username)) {
            this.username = username;
        }
    }
}

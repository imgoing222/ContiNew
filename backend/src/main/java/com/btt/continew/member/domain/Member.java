package com.btt.continew.member.domain;

import com.btt.continew.auth.domain.Authority;
import com.btt.continew.auth.domain.Provider;
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

    @Column(name = "username", length = 32, nullable = false)
    private String username;

    @Column(name = "phone_number", length = 16)
    private String phoneNumber;

    @Column(name = "phone_auth")
    private Boolean phoneAuth;

    @Enumerated(EnumType.STRING)
    @Column(name = "authority")
    private Authority authority;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider")
    private Provider provider;

    protected Member() {
    }

    @Builder
    public Member(String loginId, String password, String username, String phoneNumber, Boolean phoneAuth, Authority authority,
        Provider provider) {
        this.loginId = loginId;
        this.password = password;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.phoneAuth = phoneAuth;
        this.authority = authority;
        this.provider = provider;
    }

    public static Member createMember(String loginId, String password, String username, Provider provider) {
        return Member.builder()
            .loginId(loginId)
            .password(password)
            .username(username)
            .authority(Authority.ROLE_MEMBER)
            .phoneAuth(false)
            .provider(provider)
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

    public void changePassword(PasswordEncoder passwordEncoder, PasswordChangeRequest request) {
        checkPassword(passwordEncoder, request.getBeforePassword());
        if (!Objects.isNull(password)) {
            this.password = passwordEncoder.encode(request.getNewPassword());
        }
    }

    public void successPhoneAuth(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        this.phoneAuth = true;
    }

    public void checkSocialMember() {
        if (provider.equals(Provider.CONTINEW)) {
            throw new BusinessException(ErrorCode.MEMBER_NOT_SOCIAL_USER);
        }
    }

    public void setNewPassword(PasswordEncoder passwordEncoder, String newPassword){
        if (!Objects.isNull(password)) {
            this.password = passwordEncoder.encode(newPassword);
        }
    }
}

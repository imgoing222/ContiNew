package com.btt.continew.member.service;

import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.btt.continew.member.controller.dto.request.FindPwChangeRequest;
import com.btt.continew.member.controller.dto.request.FindPwSendRequest;
import com.btt.continew.member.controller.dto.request.CheckPhoneRequest;
import com.btt.continew.member.controller.dto.request.MemberChangeRequest;
import com.btt.continew.member.controller.dto.request.PasswordChangeRequest;
import com.btt.continew.member.controller.dto.request.PhoneNumberRequest;
import com.btt.continew.member.controller.dto.response.ChangeTokenResponse;
import com.btt.continew.member.controller.dto.response.MemberInfoResponse;
import com.btt.continew.member.domain.CertifyPassword;
import com.btt.continew.member.domain.CertifyPasswordRepository;
import com.btt.continew.member.domain.CertifyPhone;
import com.btt.continew.member.domain.CertifyPhoneRepository;
import com.btt.continew.member.domain.Member;
import java.time.LocalDateTime;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private final int MAX_REQUEST_COUNT = 3;
    private final int EXPIRED_TIME = 3;
    private final int RANDOM_CODE_LENGTH = 6;
    private final int CHANGE_TOKEN_LENGTH = 12;

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final SmsService smsService;
    private final CertifyPhoneRepository certifyPhoneRepository;
    private final CertifyPasswordRepository certifyPasswordRepository;

    public ProfileService(MemberService memberService, PasswordEncoder passwordEncoder,
        SmsService smsService, CertifyPhoneRepository certifyPhoneRepository,
        CertifyPasswordRepository certifyPasswordRepository) {
        this.memberService = memberService;
        this.passwordEncoder = passwordEncoder;
        this.smsService = smsService;
        this.certifyPhoneRepository = certifyPhoneRepository;
        this.certifyPasswordRepository = certifyPasswordRepository;
    }

    @Transactional(readOnly = true)
    public MemberInfoResponse showMemberInfo(String loginId) {
        Member member = memberService.findByLoginId(loginId);
        return MemberInfoResponse.from(member);
    }

    public void checkSameMyName(String memberName, String requestName) {
        if (memberName.equals(requestName)) {
            throw new BusinessException(ErrorCode.MEMBER_USERNAME_DUPLICATED_BECAUSE_OF_YOU);
        }
    }

    @Transactional
    public void changeMemberInfo(String loginId, MemberChangeRequest request) {
        Member member = memberService.findByLoginId(loginId);

        checkSameMyName(member.getUsername(), request.getUsername());
        memberService.checkDuplicateUsername(request.getUsername());
        member.changeUsername(request.getUsername());
    }

    @Transactional
    public void changePassword(String loginId, PasswordChangeRequest request) {
        Member member = memberService.findByLoginId(loginId);
        member.changePassword(passwordEncoder, request);
    }

    @Transactional
    public void certifiedByPhoneNumber(String loginId, PhoneNumberRequest request) {
        Member member = memberService.findByLoginId(loginId);
        memberService.checkDuplicatePhoneNumber(request.getPhoneNumber()); // 휴대폰 중복 검사

        CertifyPhone certifyPhone = certifyPhoneRepository.findByMember(member)
            .orElseGet(() -> certifyPhoneRepository.save(CertifyPhone.builder()
                .member(member)
                .build()));

        isMaxCertifyRequest(certifyPhone.getTodayCount());

        String certifiedCode;
        do {
            certifiedCode = smsService.randomCode(RANDOM_CODE_LENGTH);
        } while (certifyPhoneRepository.existsByCertificationCode(certifiedCode));

        certifyPhone.setNewCode(request.getPhoneNumber(), certifiedCode, LocalDateTime.now().plusMinutes(EXPIRED_TIME));

        smsService.sendCertifiedCode(request.getPhoneNumber(), certifiedCode);
    }

    public void isMaxCertifyRequest(int todayCount) {
        if (todayCount >= MAX_REQUEST_COUNT) {
            throw new BusinessException(ErrorCode.SMS_TOO_MANY_REQUEST);
        }
    }

    @Transactional
    public void deleteCertifyPhoneTable() {
        certifyPhoneRepository.deleteByExpireTimeBefore(LocalDateTime.now());
    }

    @Transactional
    public void checkPhoneCertifiedCode(String loginId, CheckPhoneRequest request) {
        Member member = memberService.findByLoginId(loginId);

        CertifyPhone certifyPhone = certifyPhoneRepository.findByMember(member)
            .orElseThrow(() -> new BusinessException(ErrorCode.CERTIFY_NOT_FOUND_MEMBER));

        memberService.checkDuplicatePhoneNumber(certifyPhone.getPhoneNumber()); // 번호 중복 이중 체크
        checkExpiredCode(certifyPhone.getExpireTime()); // 인증 번호 만료기한 확인
        checkCertificationCode(certifyPhone.getCertificationCode(), request.getCode()); // 인증번호 일치 여부 확인

        member.successPhoneAuth(certifyPhone.getPhoneNumber());
    }

    public void checkExpiredCode(LocalDateTime expireTime) {
        if (LocalDateTime.now().isAfter(expireTime)) {
            throw new BusinessException(ErrorCode.CERTIFY_IS_EXPIRED_CODE);
        }
    }

    public void checkCertificationCode(String certificationCode, String requestCode) {
        if (!certificationCode.equals(requestCode)) {
            throw new BusinessException(ErrorCode.CERTIFY_NOT_MATCH_CODE);
        }
    }

    @Transactional
    public void sendFindPwCode(FindPwSendRequest request) {
        Member member = memberService.findByLoginId(request.getLoginId());
        checkYourPhoneNumber(member.getPhoneNumber(), request.getPhoneNumber());

        CertifyPassword certifyPassword = certifyPasswordRepository.findByMember(member)
            .orElseGet(() -> certifyPasswordRepository.save(CertifyPassword.builder()
                .member(member)
                .build()));

        isMaxCertifyRequest(certifyPassword.getTodayCount());

        String certifyCode;
        do {
            certifyCode = smsService.randomCode(RANDOM_CODE_LENGTH);
        } while (certifyPasswordRepository.existsByCertificationCode(certifyCode));

        certifyPassword.setNewCode(certifyCode, LocalDateTime.now().plusMinutes(EXPIRED_TIME));

        smsService.sendCertifiedCode(request.getPhoneNumber(), certifyCode);
    }

    public void checkYourPhoneNumber(String memberPhoneNumber, String requestPhoneNumber) {
        if (!memberPhoneNumber.equals(requestPhoneNumber)) {
            throw new BusinessException(ErrorCode.MEMBER_NOT_YOUR_PHONE_NUMBER);
        }
    }

    @Transactional
    public ChangeTokenResponse findPwCheckCertifyCode(CheckPhoneRequest request) {
        CertifyPassword certifyPassword = certifyPasswordRepository.findByCertificationCode(request.getCode())
            .orElseThrow(() -> new BusinessException(ErrorCode.CERTIFY_NOT_MATCH_CODE)); // 인증 번호로 찾기

        checkExpiredCode(certifyPassword.getExpireTime()); // 만료 시간 확인

        String changeToken;
        do {
            changeToken = smsService.randomCode(CHANGE_TOKEN_LENGTH);
        } while (certifyPasswordRepository.existsByChangeToken(changeToken));

        certifyPassword.setChangeToken(changeToken); // 비밀번호 변경 토큰 발행

        return ChangeTokenResponse.from(certifyPassword.getChangeToken()); // 토큰을 response body 로 전송
    }

    @Transactional
    public void findPwChangePw(FindPwChangeRequest request) {
        CertifyPassword certifyPassword = certifyPasswordRepository.findByChangeToken(request.getChangeToken())
            .orElseThrow(() -> new BusinessException(ErrorCode.CERTIFY_NOT_MATCH_CHANGE_TOKEN)); // 체인지 토큰으로 찾기
        checkTokenExpired(certifyPassword.getExpired());

        certifyPassword.getMember().setNewPassword(passwordEncoder, request.getNewPassword());
        certifyPassword.setExpired();
    }

    public void checkTokenExpired(Boolean expired) {
        if (expired) {
            throw new BusinessException(ErrorCode.CERTIFY_IS_EXPIRED_TOKEN);
        }
    }
}

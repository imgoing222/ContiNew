package com.btt.continew.member.service;

import com.btt.continew.auth.controller.dto.response.GoogleUserInfoResponse;
import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.btt.continew.member.controller.dto.request.CheckDuplicateRequest;
import com.btt.continew.member.controller.dto.request.CheckPhoneRequest;
import com.btt.continew.member.controller.dto.request.MemberSaveRequest;
import com.btt.continew.member.controller.dto.request.PhoneNumberRequest;
import com.btt.continew.member.controller.dto.response.CheckDuplicateResponse;
import com.btt.continew.member.domain.CertifyPhone;
import com.btt.continew.member.domain.Member;
import com.btt.continew.member.domain.MemberRepository;
import com.btt.continew.member.domain.CertifyPhoneRepository;
import java.time.LocalDateTime;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberService {

    private final int MAX_REQUEST_COUNT = 5;
    private final int EXPIRED_TIME = 3;

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final SmsService smsService;
    private final CertifyPhoneRepository certifyPhoneRepository;

    public MemberService(MemberRepository memberRepository,
        PasswordEncoder passwordEncoder, SmsService smsService,
        CertifyPhoneRepository certifyPhoneRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.smsService = smsService;
        this.certifyPhoneRepository = certifyPhoneRepository;
    }

    @Transactional(readOnly = true)
    public Member findByLoginId(String id) {
        return memberRepository.findByLoginId(id)
            .orElseThrow(() -> new BusinessException(ErrorCode.MEMBER_NOT_FOUND_BY_LOGIN_ID));
    }

    @Transactional
    public Long saveMember(MemberSaveRequest request) {
        checkDuplicateLoginId(request.getLoginId());
        checkDuplicateUsername(request.getUsername());

        Member member = request.toMember();
        member.encodePassword(passwordEncoder);
        return memberRepository.save(member).getId();
    }

    public void checkDuplicateLoginId(String loginId) {
        if (memberRepository.existsByLoginId(loginId)) {
            throw new BusinessException(ErrorCode.MEMBER_LOGIN_ID_DUPLICATED);
        }
    }

    public void checkDuplicateUsername(String username) {
        if (memberRepository.existsByUsername(username)) {
            throw new BusinessException(ErrorCode.MEMBER_USERNAME_DUPLICATED);
        }
    }

    @Transactional(readOnly = true)
    public CheckDuplicateResponse checkExistLoginId(CheckDuplicateRequest request) {
        return CheckDuplicateResponse.from(memberRepository.existsByLoginId(request.getValue()));
    }

    @Transactional(readOnly = true)
    public CheckDuplicateResponse checkExistUsername(CheckDuplicateRequest request) {
        return CheckDuplicateResponse.from(memberRepository.existsByUsername(request.getValue()));
    }

    @Transactional
    public void certifiedByPhoneNumber(String loginId, PhoneNumberRequest request) {
        Member member = findByLoginId(loginId);
        checkDuplicatePhoneNumber(request.getPhoneNumber()); // 휴대폰 중복 검사

        CertifyPhone certifyPhone = certifyPhoneRepository.findByMember(member)
            .orElseGet(() -> certifyPhoneRepository.save(CertifyPhone.builder()
                .member(member)
                .build()));

        isMaxCertifyRequest(certifyPhone);

        String certifiedCode = smsService.randomCode();

        certifyPhone.setNewCode(request.getPhoneNumber(), certifiedCode, LocalDateTime.now().plusMinutes(EXPIRED_TIME));

        smsService.sendCertifiedCode(request.getPhoneNumber(), certifiedCode);
    }

    public void checkDuplicatePhoneNumber(String phoneNumber) {
        if (memberRepository.existsByPhoneNumber(phoneNumber)) {
            throw new BusinessException(ErrorCode.MEMBER_PHONE_NUMBER_DUPLICATED);
        }
    }

    public void isMaxCertifyRequest(CertifyPhone certifyPhone) {
        if (certifyPhone.getTodayCount() >= MAX_REQUEST_COUNT) {
            throw new BusinessException(ErrorCode.SMS_TOO_MANY_REQUEST);
        }
    }

    @Transactional
    public void deleteCertifyPhoneTable() {
        certifyPhoneRepository.deleteByExpireTimeBefore(LocalDateTime.now());
    }

    @Transactional
    public void checkPhoneCertifiedCode(String loginId, CheckPhoneRequest request) {
        Member member = findByLoginId(loginId);

        CertifyPhone certifyPhone = certifyPhoneRepository.findByMember(member)
            .orElseThrow(() -> new BusinessException(ErrorCode.CERTIFY_NOT_FOUND_MEMBER));

        checkDuplicatePhoneNumber(certifyPhone.getPhoneNumber()); // 번호 중복 이중 체크
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
    public Member loadGoogleUser(GoogleUserInfoResponse response) {
        Member member = memberRepository.findByLoginId(response.getEmail())
            .orElse(response.toEntity());
        member.checkSocialMember();
        return memberRepository.save(member);
    }
}

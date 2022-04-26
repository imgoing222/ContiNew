package com.btt.continew.member.service;

import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.btt.continew.member.controller.dto.request.CheckDuplicateRequest;
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
        // 5회 이상 했는지 확인
        isMaxCertifyRequest(loginId);
        // 이미 인증된 휴대폰 번호인지 확인
        checkDuplicatePhoneNumber(request.getPhoneNumber());

        // 인증 번호 생성
        String certifiedCode = smsService.randomCode();

        // 디비에 저장
        CertifyPhone certifyPhone = CertifyPhone.builder()
            .certificationCode(certifiedCode)
            .phoneNumber(request.getPhoneNumber())
            .loginId(loginId)
            .expireTime(LocalDateTime.now().plusMinutes(EXPIRED_TIME))
            .build();
        certifyPhoneRepository.save(certifyPhone);

        // 문자 보내기
        smsService.sendCertifiedCode(request.getPhoneNumber(), certifiedCode);
    }

    public void checkDuplicatePhoneNumber(String phoneNumber) {
        if (memberRepository.existsByPhoneNumber(phoneNumber)) {
            throw new BusinessException(ErrorCode.MEMBER_PHONE_NUMBER_DUPLICATED);
        }
    }

    public void isMaxCertifyRequest(String loginId) {
        if (certifyPhoneRepository.countByLoginId(loginId) >= MAX_REQUEST_COUNT) {
            throw new BusinessException(ErrorCode.SMS_TOO_MANY_REQUEST);
        }
    }
}

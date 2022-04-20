package com.btt.continew.member.service;

import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.btt.continew.member.controller.dto.request.MemberSaveRequest;
import com.btt.continew.member.domain.Member;
import com.btt.continew.member.domain.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository,
        PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
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
}

package com.btt.continew.member.service;

import com.btt.continew.member.controller.dto.response.MemberInfoResponse;
import com.btt.continew.member.domain.Member;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

    public ProfileService(MemberService memberService, PasswordEncoder passwordEncoder) {
        this.memberService = memberService;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public MemberInfoResponse showMemberInfo(String loginId) {
        Member member = memberService.findByLoginId(loginId);
        return MemberInfoResponse.from(member);
    }
}

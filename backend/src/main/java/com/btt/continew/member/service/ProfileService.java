package com.btt.continew.member.service;

import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.btt.continew.member.controller.dto.request.MemberChangeRequest;
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

    public void checkSameMyName (String memberName, String requestName){
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
}

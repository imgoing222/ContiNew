package com.btt.continew.member.service;

import com.btt.continew.member.domain.Member;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberDeleteService {

    private final MemberService memberService;

    public MemberDeleteService(MemberService memberService) {
        this.memberService = memberService;
    }

    @Transactional
    public void resignMember(String loginId){
        Member member = memberService.findByLoginIdAndDeletedAtNull(loginId);

        member.changeUsername("resign-"+member.getId());
        member.saveDeletedTime();
    }
}

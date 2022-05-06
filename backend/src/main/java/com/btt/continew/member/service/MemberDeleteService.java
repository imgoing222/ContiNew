package com.btt.continew.member.service;

import org.springframework.stereotype.Service;

@Service
public class MemberDeleteService {

    private final MemberService memberService;

    public MemberDeleteService(MemberService memberService) {
        this.memberService = memberService;
    }

    public void resignMember(String loginId){

    }
}

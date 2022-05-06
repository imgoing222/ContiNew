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

        // 여기에 해당 서비스의 삭제 로직을 넣으시면 됩니다.
        // 로그인 관련

        // 매물 관련

        // 채팅 관련

        member.changeUsername("resign-"+member.getId());
        member.saveDeletedTime();
    }
}

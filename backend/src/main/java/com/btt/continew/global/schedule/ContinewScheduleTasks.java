package com.btt.continew.global.schedule;

import com.btt.continew.member.service.MemberService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ContinewScheduleTasks {

    private final MemberService memberService;

    public ContinewScheduleTasks(MemberService memberService) {
        this.memberService = memberService;
    }

    @Scheduled(cron = "0 3 0 * * *")
    // 초 분 시 일 월 요일
    public void deleteCertifyPhoneTable() {
        memberService.deleteCertifyPhoneTable();
    }
}

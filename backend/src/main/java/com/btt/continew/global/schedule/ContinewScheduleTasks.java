package com.btt.continew.global.schedule;

import com.btt.continew.member.service.ProfileService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ContinewScheduleTasks {

    private final ProfileService profileService;

    public ContinewScheduleTasks(ProfileService profileService) {
        this.profileService = profileService;
    }

    @Scheduled(cron = "0 3 0 * * *")
    // 초 분 시 일 월 요일
    public void deleteCertifyPhoneTable() {
        profileService.deleteCertifyPhoneTable();
    }
}

package com.btt.continew.global.schedule;

import com.btt.continew.auth.service.AuthService;
import com.btt.continew.member.service.ProfileService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ContinewScheduleTasks {

    private final ProfileService profileService;
    private final AuthService authService;

    public ContinewScheduleTasks(ProfileService profileService, AuthService authService) {
        this.profileService = profileService;
        this.authService = authService;
    }

    @Scheduled(cron = "0 3 0 * * *")
    // 초 분 시 일 월 요일
    public void deleteTables() {
        profileService.deleteCertifyCodeTable();
        authService.deleteRefreshTokenTable();
    }
}

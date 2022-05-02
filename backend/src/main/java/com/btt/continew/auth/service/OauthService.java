package com.btt.continew.auth.service;

import com.btt.continew.auth.Oauth.GoogleOauth;
import com.btt.continew.auth.controller.dto.AuthorizationGoogle;
import com.btt.continew.auth.controller.dto.response.GoogleUserInfoResponse;
import com.btt.continew.auth.controller.dto.response.TokenResponse;
import com.btt.continew.auth.infrastructure.JwtTokenProvider;
import com.btt.continew.member.domain.Member;
import com.btt.continew.member.service.MemberService;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OauthService {

    private final GoogleOauth googleOauth;
    private final MemberService memberService;
    private final AuthService authService;
    private final JwtTokenProvider jwtTokenProvider;

    public OauthService(GoogleOauth googleOauth, MemberService memberService, AuthService authService,
        JwtTokenProvider jwtTokenProvider) {
        this.googleOauth = googleOauth;
        this.memberService = memberService;
        this.authService = authService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Transactional
    public void request(HttpServletResponse response) {
        try {
            response.sendRedirect(googleOauth.getRedirectUrl());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Transactional
    public void requestToken(HttpServletResponse response, String code) {
        AuthorizationGoogle authorization = googleOauth.requestAccessToken(code);
        GoogleUserInfoResponse userResponse = googleOauth.requestUserInfoByGoogleAuth(authorization);

        Member member = memberService.loadGoogleUser(userResponse);
        TokenResponse tokenResponse = jwtTokenProvider.createToken(member.getLoginId(), member.getAuthority());
        String refreshTokenId = authService.saveRefreshToken(member, tokenResponse);
        authService.setTokenToCookie(tokenResponse.getAccessToken(), refreshTokenId, response);
    }
}

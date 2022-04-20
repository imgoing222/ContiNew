package com.btt.continew.auth.service;

import com.btt.continew.auth.controller.dto.request.LoginRequest;
import com.btt.continew.auth.controller.dto.response.TokenResponse;
import com.btt.continew.auth.infrastructure.JwtTokenProvider;
import com.btt.continew.member.domain.Member;
import com.btt.continew.member.service.MemberService;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(MemberService memberService, PasswordEncoder passwordEncoder,
        JwtTokenProvider jwtTokenProvider) {
        this.memberService = memberService;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Transactional
    public void login(LoginRequest request, HttpServletResponse response) {
        Member member = memberService.findByLoginId(request.getLoginId());
        member.CheckPasswordForLogin(passwordEncoder, request.getPassword());

        TokenResponse tokenResponse = jwtTokenProvider.createToken(member.getLoginId(), member.getAuthority());

        setTokenToCookie(tokenResponse.getAccessToken(), response);
    }

    private void setTokenToCookie(String accessToken, HttpServletResponse response) {
        Cookie accessTokenCookie = new Cookie("access_token", accessToken);
        accessTokenCookie.setMaxAge(30 * 60); // expires in 30 minutes
        accessTokenCookie.setSecure(true);
//        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setPath("/");
        response.addCookie(accessTokenCookie);
    }
}

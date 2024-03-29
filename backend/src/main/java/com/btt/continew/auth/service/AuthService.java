package com.btt.continew.auth.service;

import com.btt.continew.auth.controller.dto.request.LoginRequest;
import com.btt.continew.auth.controller.dto.request.ReissueRequest;
import com.btt.continew.auth.controller.dto.response.TokenResponse;
import com.btt.continew.auth.domain.RefreshToken;
import com.btt.continew.auth.domain.RefreshTokenRepository;
import com.btt.continew.auth.infrastructure.JwtTokenProvider;
import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.btt.continew.member.domain.Member;
import com.btt.continew.member.service.MemberService;
import java.time.LocalDateTime;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;


    public AuthService(MemberService memberService, PasswordEncoder passwordEncoder,
        JwtTokenProvider jwtTokenProvider, RefreshTokenRepository refreshTokenRepository) {
        this.memberService = memberService;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Transactional
    public void login(LoginRequest request, HttpServletResponse response) {
        Member member = memberService.findByLoginIdAndDeletedAtNull(request.getLoginId());
        member.checkPassword(passwordEncoder, request.getPassword());

        TokenResponse tokenResponse = jwtTokenProvider.createToken(member.getLoginId(), member.getAuthority());
        String refreshToken = saveRefreshToken(member, tokenResponse);
        setTokenToCookie(tokenResponse.getAccessToken(), refreshToken, response);
    }

    @Transactional
    public String saveRefreshToken(Member member, TokenResponse tokenResponse) {
        RefreshToken refreshToken = refreshTokenRepository.findBySubject(member.getLoginId())
            .orElse(RefreshToken.builder()
                .subject(member.getLoginId())
                .expiredAt(LocalDateTime.now().plusDays(7))
                .build());

        refreshToken.updateRefreshToken(tokenResponse.getRefreshToken());
        refreshTokenRepository.save(refreshToken);
        return refreshToken.getRefreshToken();
    }

    public void setTokenToCookie(String accessToken, String refreshToken, HttpServletResponse response) {
        Cookie accessTokenCookie = new Cookie("access_token", accessToken);
        accessTokenCookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7days, 기간 지난 access token 도 필요하다고 함
        accessTokenCookie.setSecure(true);
//        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setPath("/");
        response.addCookie(accessTokenCookie);

        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
        refreshTokenCookie.setSecure(true);
//        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        response.addCookie(refreshTokenCookie);
    }

    @Transactional
    public void reissue(ReissueRequest request, HttpServletResponse response) {
        jwtTokenProvider.validateRefreshToken(request.getRefreshToken());
        Authentication authentication = jwtTokenProvider.getAuthentication(request.getAccessToken());

        RefreshToken refreshToken = refreshTokenRepository.findBySubject(authentication.getName())
            .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_LOGOUT_USER_JWT));

        refreshToken.validateValue(request.getRefreshToken());

        TokenResponse tokenResponse = jwtTokenProvider.createToken(authentication.getName(),
            jwtTokenProvider.getAuthority(authentication));

        refreshToken.updateRefreshToken(tokenResponse.getRefreshToken());
        refreshTokenRepository.save(refreshToken);
        setTokenToCookie(tokenResponse.getAccessToken(), refreshToken.getRefreshToken(), response);
    }

    @Transactional
    public void deleteRefreshTokenTable() {
        refreshTokenRepository.deleteByExpiredAtBefore(LocalDateTime.now());
    }
}

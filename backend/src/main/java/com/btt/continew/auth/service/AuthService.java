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
import javax.annotation.PostConstruct;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    //
    private static final String REFRESH_TOKEN = "REFRESH_TOKEN";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, RefreshToken> opsHashRefreshToken;
    //

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final long refreshTime;

    //
    @PostConstruct
    private void init(){
        opsHashRefreshToken = redisTemplate.opsForHash();
    }
    //

    public AuthService(MemberService memberService, PasswordEncoder passwordEncoder,
        JwtTokenProvider jwtTokenProvider, RefreshTokenRepository refreshTokenRepository,
        @Value("${jwt.token.refresh-time}") long refreshTime, RedisTemplate<String, Object> redisTemplate) {
        this.memberService = memberService;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTime = refreshTime;
        ///
        this.redisTemplate = redisTemplate;
        //
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
                .timeout(refreshTime)
                .build());

        refreshToken.updateRefreshToken(tokenResponse.getRefreshToken());
//
        opsHashRefreshToken.put(REFRESH_TOKEN,refreshToken.getRefreshToken(),refreshToken);
//        refreshTokenRepository.save(refreshToken);
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

//        RefreshToken refreshToken = refreshTokenRepository.findBySubject(authentication.getName())
//            .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_LOGOUT_USER_JWT));
//
        RefreshToken refreshToken = opsHashRefreshToken.get(REFRESH_TOKEN, request.getRefreshToken());
//            .orElseThrow(() -> new BusinessException(ErrorCode.INVALID_LOGOUT_USER_JWT));
//
        refreshToken.validateValue(request.getRefreshToken());

        TokenResponse tokenResponse = jwtTokenProvider.createToken(authentication.getName(),
            jwtTokenProvider.getAuthority(authentication));

        refreshToken.updateRefreshToken(tokenResponse.getRefreshToken());
        //
        opsHashRefreshToken.put(REFRESH_TOKEN,refreshToken.getRefreshToken(),refreshToken);
//        refreshTokenRepository.save(refreshToken);
        setTokenToCookie(tokenResponse.getAccessToken(), refreshToken.getRefreshToken(), response);
    }
}

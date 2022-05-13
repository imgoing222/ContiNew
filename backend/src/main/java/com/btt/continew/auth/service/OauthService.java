package com.btt.continew.auth.service;

import com.btt.continew.auth.Oauth.GoogleOauth;
import com.btt.continew.auth.controller.dto.AuthorizationGoogle;
import com.btt.continew.auth.controller.dto.response.GoogleUserInfoResponse;
import com.btt.continew.auth.controller.dto.response.TokenResponse;
import com.btt.continew.auth.infrastructure.JwtTokenProvider;
import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.btt.continew.member.domain.Member;
import com.btt.continew.member.service.MemberService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class OauthService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final MemberService memberService;
    private final AuthService authService;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${jwt.google.client-id}")
    private String GOOGLE_CLIENT_ID;
    @Value("${jwt.google.client-secret}")
    private String GOOGLE_CLIENT_SECRET;
    @Value("${jwt.google.redirect-url}")
    private String GOOGLE_REDIRECT_URL;
    private static final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
    private static final String GOOGLE_USERINFO_URL = "https://oauth2.googleapis.com/tokeninfo?id_token=";
    private static final String GRANT_TYPE = "authorization_code";

    public OauthService(RestTemplate restTemplate, ObjectMapper objectMapper,
        MemberService memberService, AuthService authService, JwtTokenProvider jwtTokenProvider) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
        this.memberService = memberService;
        this.authService = authService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    //    @Transactional
//    public void requestLoginUrl(HttpServletResponse response) {
//        try {
//            response.sendRedirect(googleOauth.getRedirectUrl());
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

    @Transactional
    public void requestToken(HttpServletResponse response, String code) {
        System.out.println(code);
        AuthorizationGoogle authorization = requestAccessToken(code);
        GoogleUserInfoResponse userResponse = requestUserInfoByGoogleAuth(authorization.getAccess_token(),
            authorization.getId_token());

        Member member = memberService.loadGoogleUser(userResponse);
        TokenResponse tokenResponse = jwtTokenProvider.createToken(member.getLoginId(), member.getAuthority());
        String refreshTokenId = authService.saveRefreshToken(member, tokenResponse);
        authService.setTokenToCookie(tokenResponse.getAccessToken(), refreshTokenId, response);
    }

    private AuthorizationGoogle requestAccessToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", GRANT_TYPE);
        params.add("client_id", GOOGLE_CLIENT_ID);
        params.add("client_secret", GOOGLE_CLIENT_SECRET);
        params.add("redirect_uri", GOOGLE_REDIRECT_URL);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(GOOGLE_TOKEN_URL, request, String.class);
            AuthorizationGoogle authorization = objectMapper.readValue(response.getBody(), AuthorizationGoogle.class);
            return authorization;
        } catch (RestClientException | JsonProcessingException e) {
            e.printStackTrace();
            throw new BusinessException(ErrorCode.LOGIN_GOOGLE_RESPONSE_FAIL);
        }
    }

    private GoogleUserInfoResponse requestUserInfoByGoogleAuth(String accessToken, String idToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<GoogleUserInfoResponse> response = restTemplate.postForEntity(GOOGLE_USERINFO_URL+idToken, request, GoogleUserInfoResponse.class);
            return response.getBody();
        } catch (RestClientException e) {
            e.printStackTrace();
            throw new BusinessException(ErrorCode.GLOBAL_INTERNAL_SERVER_ERROR);
        }
    }
}

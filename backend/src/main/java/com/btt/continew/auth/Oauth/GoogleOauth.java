package com.btt.continew.auth.Oauth;

import com.btt.continew.auth.controller.dto.AuthorizationGoogle;
import com.btt.continew.auth.controller.dto.response.GoogleUserInfoResponse;
import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Component
public class GoogleOauth {

    @Value("${jwt.google.client-id}")
    private String GOOGLE_CLIENT_ID;
    @Value("${jwt.google.client-secret}")
    private String GOOGLE_CLIENT_SECRET;
    @Value("${jwt.google.redirect-url}")
    private String GOOGLE_REDIRECT_URL;
    @Value("${jwt.google.token-url}")
    private String GOOGLE_TOKEN_URL;
    @Value("${jwt.google.scope}")
    private String GOOGLE_SCOPE;
    private static final String GOOGLE_BASE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    private static final String GOOGLE_USERINFO_URL = "https://oauth2.googleapis.com/tokeninfo?id_token=";

    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    public GoogleOauth(ObjectMapper objectMapper, RestTemplate restTemplate) {
        this.objectMapper = objectMapper;
        this.restTemplate = restTemplate;
    }

    public String getRedirectUrl() {
        Map<String, Object> params = new HashMap<>();
        params.put("scope", GOOGLE_SCOPE);
        params.put("response_type", "code");
        params.put("client_id", GOOGLE_CLIENT_ID);
        params.put("redirect_uri", GOOGLE_REDIRECT_URL);

        String parameterString = params.entrySet().stream()
            .map(x -> x.getKey() + "=" + x.getValue())
            .collect(Collectors.joining("&"));

        return GOOGLE_BASE_URL + "?" + parameterString;
    }

    public AuthorizationGoogle requestAccessToken(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", GOOGLE_CLIENT_ID);
        params.add("client_secret", GOOGLE_CLIENT_SECRET);
        params.add("redirect_uri", GOOGLE_REDIRECT_URL);
        params.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(GOOGLE_TOKEN_URL, request, String.class);
            return objectMapper.readValue(response.getBody(), AuthorizationGoogle.class);
        } catch (JsonProcessingException e) {
            throw new BusinessException(ErrorCode.LOGIN_GOOGLE_RESPONSE_FAIL);
        }
    }

    public GoogleUserInfoResponse requestUserInfoByGoogleAuth(AuthorizationGoogle authorization) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + authorization.getAccess_token());
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<GoogleUserInfoResponse> response = restTemplate.postForEntity(
                GOOGLE_USERINFO_URL + authorization.getId_token(), request, GoogleUserInfoResponse.class);
            return response.getBody();
        } catch (RestClientException e) {
            throw new BusinessException(ErrorCode.LOGIN_GOOGLE_USER_INFO_RESPONSE_FAIL);
        }
    }
}

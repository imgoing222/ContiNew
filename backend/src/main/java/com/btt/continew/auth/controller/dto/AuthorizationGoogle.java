package com.btt.continew.auth.controller.dto;

import lombok.Getter;

@Getter
public class AuthorizationGoogle {

    private String access_token;
    private String expires_in;
    private String scope;
    private String id_token;
}

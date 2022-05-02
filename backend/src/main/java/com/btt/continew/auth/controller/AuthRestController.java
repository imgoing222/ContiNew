package com.btt.continew.auth.controller;

import com.btt.continew.auth.controller.dto.request.LoginRequest;
import com.btt.continew.auth.controller.dto.request.ReissueRequest;
import com.btt.continew.auth.service.AuthService;
import com.btt.continew.auth.service.OauthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"로그인"})
public class AuthRestController {

    private final AuthService authService;
    private final OauthService oauthService;

    public AuthRestController(AuthService authService, OauthService oauthService) {
        this.authService = authService;
        this.oauthService = oauthService;
    }

    @PostMapping("/members/login")
    @ApiOperation(value = "로그인", notes = "로그인 API")
    public ResponseEntity<Void> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        authService.login(request, response);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/members/reissue")
    @ApiOperation(value = "토큰 재발급", notes = "토큰을 재발급하는 API")
    public ResponseEntity<Void> reissue(@RequestBody ReissueRequest tokenRequest, HttpServletResponse response) {
        authService.reissue(tokenRequest, response);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/members/login/google")
    @ApiOperation(value = "구글 회원가입 및 페이지로 이동", notes = "해당 api 주소를 입력하면 구글 로그인 페이지로 이동한다")
    public ResponseEntity<Void> googleLogin(HttpServletResponse response) {
        oauthService.requestLoginUrl(response);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/members/login/google/callback")
    @ApiOperation(value = "구글 회원가입 및 로그인 콜백", notes = "구글 로그인 페이지에서 로그인 하면 code를 받을 수 있는데"
        + "이 api에 쿼리스트링으로 code를 넣어 호출하면 백에서 자동으로 회원가입 혹은 로그인이 되어 access token과 refresh token을 쿠키로 전달받는다.")
    public ResponseEntity<Void> googleLoginCallback(@RequestParam(name = "code") String code, HttpServletResponse response) {
        oauthService.requestToken(response, code);
        return ResponseEntity.noContent().build();
    }
}

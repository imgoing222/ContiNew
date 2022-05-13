package com.btt.continew.auth.controller;

import com.btt.continew.auth.controller.dto.request.LoginRequest;
import com.btt.continew.auth.controller.dto.request.ReissueRequest;
import com.btt.continew.auth.service.AuthService;
import com.btt.continew.auth.service.OauthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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
    @ApiResponses({
        @ApiResponse(code = 401, message = "UNAUTHORIZED\n일치하지 않는 비밀번호(M04)"),
        @ApiResponse(code = 404, message = "NOT FOUND\n존재하지 않는 로그인 아이디(M01)")
    })
    public ResponseEntity<Void> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        authService.login(request, response);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/members/reissue")
    @ApiOperation(value = "토큰 재발급", notes = "토큰을 재발급하는 API")
    @ApiResponses({
        @ApiResponse(code = 400, message = "BAD REQUEST\n일치하지 않는 리프레시 토큰(J10)"),
        @ApiResponse(code = 401, message = "UNAUTHORIZED\n잘못된 리프레시 토큰 서명(J12)\n지원하지 않는 리프레시 토큰(J13)\n"
            + "잘못된 리프레시 토큰(J14)\n로그아웃된 유저(J05)"),
        @ApiResponse(code = 403, message = "FORBIDDEN\n만료된 리프레시 토큰(J11)"),
        @ApiResponse(code = 404, message = "NOT FOUND\n권한값이 없는 엑세스 토큰(J06)")
    })
    public ResponseEntity<Void> reissue(@RequestBody ReissueRequest tokenRequest, HttpServletResponse response) {
        authService.reissue(tokenRequest, response);
        return ResponseEntity.noContent().build();
    }

//    @GetMapping("/members/login/google")
//    @ApiOperation(value = "구글 회원가입 및 페이지로 이동", notes = "해당 api 주소를 입력하면 구글 로그인 페이지로 이동한다")
//    public ResponseEntity<Void> googleLogin(HttpServletResponse response) {
//        oauthService.requestLoginUrl(response);
//        return ResponseEntity.noContent().build();
//    }

    @GetMapping("/members/login/google/callback")
    @ApiOperation(value = "구글 회원가입 및 로그인 콜백", notes = "구글 로그인 페이지에서 로그인 하면 code를 받을 수 있는데\n"
        + "이 api에 쿼리스트링으로 code를 넣어 호출하면\n"
        + "백에서 자동으로 회원가입 혹은 로그인이 되어\n"
        + "access token과 refresh token을 쿠키로 전달받는다.")
    @ApiResponses({
        @ApiResponse(code = 400, message = "BAD REQUEST\n구글의 응답을 받지 못함(L01)\n구글 유저 정보 응답을 받지 못함(L02)"),
        @ApiResponse(code = 403, message = "CONFLICT\n소셜 로그인 회원이 아님(M07)")
    })
    public ResponseEntity<Void> googleLoginCallback(@RequestParam String code, HttpServletResponse response) {
        oauthService.requestToken(response, code);
        return ResponseEntity.noContent().build();
    }
}

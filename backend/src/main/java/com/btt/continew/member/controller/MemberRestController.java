package com.btt.continew.member.controller;

import com.btt.continew.member.controller.dto.request.CheckDuplicateRequest;
import com.btt.continew.member.controller.dto.request.CheckPhoneRequest;
import com.btt.continew.member.controller.dto.request.MemberSaveRequest;
import com.btt.continew.member.controller.dto.request.PhoneNumberRequest;
import com.btt.continew.member.controller.dto.response.CheckDuplicateResponse;
import com.btt.continew.member.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"회원"})
public class MemberRestController {

    private final MemberService memberService;

    public MemberRestController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/members")
    @ApiOperation(value = "회원가입", notes = "회원 가입")
    @ApiResponses({
        @ApiResponse(code = 409, message = "CONFLICT\n로그인 아이디 중복(M02)\n닉네임 중복(M03)")
    })
    public ResponseEntity<Void> join(@RequestBody MemberSaveRequest request) {
        Long joinMemberId = memberService.saveMember(request);
        URI uri = URI.create("/api/members/" + joinMemberId);
        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/members/exist-login-id")
    @ApiOperation(value = "아이디 중복검사", notes = "아이디 중복 검사")
    public ResponseEntity<CheckDuplicateResponse> checkExistLoginId(@RequestBody CheckDuplicateRequest request) {
        return ResponseEntity.ok().body(memberService.checkExistLoginId(request));
    }

    @PostMapping("/members/exist-username")
    @ApiOperation(value = "유저네임 중복검사", notes = "유저네임 중복 검사")
    public ResponseEntity<CheckDuplicateResponse> checkExistUsername(@RequestBody CheckDuplicateRequest request) {
        return ResponseEntity.ok().body(memberService.checkExistUsername(request));
    }

    @PostMapping("/auth/members/phone-send")
    @ApiOperation(value = "휴대폰 인증 번호 문자 받기", notes = "(로그인 필요) 휴대폰 인증 번호 문자 받는 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT FOUND\n존재하지 않는 로그인 아이디(M01)"),
        @ApiResponse(code = 409, message = "CONFLICT\n이미 인증된 휴대폰 번호(M06)\n휴대폰 인증 일일 5회 초과(P01)")
    })
    public ResponseEntity<Void> sendPhoneCertifiedCode(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestBody PhoneNumberRequest request) {
        memberService.certifiedByPhoneNumber(loginId, request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/auth/members/phone-check")
    @ApiOperation(value = "휴대폰 인증 번호 확인", notes = "(로그인 필요) 휴대폰 인증 번호 확인하는 API")
    @ApiResponses({
        @ApiResponse(code = 403, message = "FORBIDDEN\n만료된 인증 번호(I02)"),
        @ApiResponse(code = 404, message = "NOT FOUND\n존재하지 않는 로그인 아이디(M01)\n"
            + "해당 아이디가 휴대폰 인증 번호를 요청한 적이 없음(I01)\n일치하지 않는 인증 번호(I03)"),
        @ApiResponse(code = 409, message = "CONFLICT\n이미 인증된 휴대폰 번호(M06)")
    })
    public ResponseEntity<Void> checkPhoneCertifiedCode(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestBody CheckPhoneRequest request) {
        memberService.checkPhoneCertifiedCode(loginId, request);
        return ResponseEntity.noContent().build();
    }
}

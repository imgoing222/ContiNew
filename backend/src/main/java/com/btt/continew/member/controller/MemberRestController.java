package com.btt.continew.member.controller;

import com.btt.continew.member.controller.dto.request.CheckDuplicateRequest;
import com.btt.continew.member.controller.dto.request.MemberSaveRequest;
import com.btt.continew.member.controller.dto.response.CheckDuplicateResponse;
import com.btt.continew.member.service.MemberDeleteService;
import com.btt.continew.member.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"회원"})
public class MemberRestController {

    private final MemberService memberService;
    private final MemberDeleteService memberDeleteService;

    public MemberRestController(MemberService memberService, MemberDeleteService memberDeleteService) {
        this.memberService = memberService;
        this.memberDeleteService = memberDeleteService;
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

    @DeleteMapping("/members")
    @ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴")
    public ResponseEntity<Void> resignMember(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId){
        memberDeleteService.resignMember(loginId);
        return ResponseEntity.noContent().build();
    }
}

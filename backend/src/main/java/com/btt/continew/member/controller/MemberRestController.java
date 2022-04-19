package com.btt.continew.member.controller;

import com.btt.continew.member.controller.dto.request.MemberSaveRequest;
import com.btt.continew.member.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.net.URI;
import org.springframework.http.ResponseEntity;
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
    @ApiOperation(value = "회원가입", notes = "회원 가입 api")
    @ApiResponses({
        @ApiResponse(code = 409, message = "CONFLICT\n로그인 아이디가 중복일 때(M01)\n닉네임이 중복일 때(M02)")
    })
    public ResponseEntity<Void> join(@RequestBody MemberSaveRequest request) {
        Long joinMemberId = memberService.saveMember(request);
        URI uri = URI.create("/api/members/" + joinMemberId);
        return ResponseEntity.created(uri).build();
    }
}

package com.btt.continew.member.controller;

import com.btt.continew.member.controller.dto.request.MemberChangeRequest;
import com.btt.continew.member.controller.dto.response.MemberInfoResponse;
import com.btt.continew.member.service.ProfileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"프로필"})
public class ProfileRestController {

    private final ProfileService profileService;

    public ProfileRestController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/auth/members")
    @ApiOperation(value = "회원 정보 조회", notes = "<span style=\"font-weight=550; color=#ff5f5f\">(로그인 필요)</span> 회원 정보 조회")
    public ResponseEntity<MemberInfoResponse> showMemberInfo(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId) {
        return ResponseEntity.ok().body(profileService.showMemberInfo(loginId));
    }

    @PutMapping("/auth/members/info")
    @ApiOperation(value = "회원정보 변경", notes = "<span style=\"font-weight=550; color=#ff5f5f\">(로그인 필요)</span> 닉네임 변경\n"
        + "현재는 닉네임밖에 없으나 추후 더 생길것을 생각해서 api 주소를 info로 하였음")
    public ResponseEntity<Void> changeMemberInfo(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestBody MemberChangeRequest request) {
        profileService.changeMemberInfo(loginId, request);
        return ResponseEntity.noContent().build();
    }
}

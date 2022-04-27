package com.btt.continew.member.controller;

import com.btt.continew.member.controller.dto.request.MemberChangeRequest;
import com.btt.continew.member.controller.dto.request.PasswordChangeRequest;
import com.btt.continew.member.controller.dto.response.MemberInfoResponse;
import com.btt.continew.member.service.ProfileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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
    @ApiOperation(value = "회원 정보 조회", notes = "(로그인 필요) 회원 정보 조회")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT FOUND\n존재하지 않는 로그인 아이디(M01)")
    })
    public ResponseEntity<MemberInfoResponse> showMemberInfo(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId) {
        return ResponseEntity.ok().body(profileService.showMemberInfo(loginId));
    }

    @PutMapping("/auth/members/info")
    @ApiOperation(value = "회원정보 변경", notes = "(로그인 필요) 닉네임 변경\n"
        + "현재는 닉네임밖에 없으나 추후 더 생길 것을 생각해서 api 주소를 info로 하였음")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT FOUND\n존재하지 않는 로그인 아이디(M01)"),
        @ApiResponse(code = 409, message = "CONFLICT\n이미 사용 중인 닉네임(M03)\n자신이 사용 중인 닉네임(M05)")
    })
    public ResponseEntity<Void> changeMemberInfo(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestBody MemberChangeRequest request) {
        profileService.changeMemberInfo(loginId, request);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/auth/members/password")
    @ApiOperation(value = "비밀번호 변경", notes = "(로그인 필요) 비밀번호 변경")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT FOUND\n존재하지 않는 로그인 아이디(M01)")
    })
    public ResponseEntity<Void> changePassword(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestBody PasswordChangeRequest request) {
        profileService.changePassword(loginId, request);
        return ResponseEntity.noContent().build();
    }
}

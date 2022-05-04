package com.btt.continew.member.controller;

import com.btt.continew.member.controller.dto.request.FindPwChangeRequest;
import com.btt.continew.member.controller.dto.request.FindPwSendRequest;
import com.btt.continew.member.controller.dto.request.CheckPhoneRequest;
import com.btt.continew.member.controller.dto.request.MemberChangeRequest;
import com.btt.continew.member.controller.dto.request.PasswordChangeRequest;
import com.btt.continew.member.controller.dto.request.PhoneNumberRequest;
import com.btt.continew.member.controller.dto.response.ChangeTokenResponse;
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
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping("/auth/members/phone-send")
    @ApiOperation(value = "휴대폰 인증 번호 문자 받기", notes = "(로그인 필요) 휴대폰 인증 번호 문자 받는 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT FOUND\n존재하지 않는 로그인 아이디(M01)"),
        @ApiResponse(code = 409, message = "CONFLICT\n이미 인증된 휴대폰 번호(M06)\n휴대폰 인증 일일 3회 초과(P01)")
    })
    public ResponseEntity<Void> sendPhoneCertifiedCode(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestBody PhoneNumberRequest request) {
        profileService.certifiedByPhoneNumber(loginId, request);
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
        profileService.checkPhoneCertifiedCode(loginId, request);
        return ResponseEntity.noContent().build();
    }

    // 비밀번호 인증 문자 받기 request: login_id, phone_number / response: HttpStatus 204 No content
    @PostMapping("/members/find-pw/phone-send")
    @ApiOperation(value = "비밀번호 찾기(1) 인증 번호 문자 받기", notes = "비밀번호를 찾기 위한 여정 - 1\n"
        + "휴대폰으로 인증 번호 받기 API")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT FOUND\n존재하지 않는 로그인 아이디(M01)"),
        @ApiResponse(code = 409, message = "CONFLICT\n본인의 전화번호가 아님(M08)\n휴대폰 인증 일일 3회 초과(P01)")
    })
    public ResponseEntity<Void> sendFindPwCode(@RequestBody FindPwSendRequest request) {
        profileService.sendFindPwCode(request);
        return ResponseEntity.noContent().build();
    }

    // 비밀번호 인증 번호 확인 request: code / response: HttpStatus 200 OK (body: change_token)
    @PostMapping("/members/find-pw/phone-check")
    @ApiOperation(value = "비밀번호 찾기(2) 인증 번호 확인", notes = "비밀번호를 찾기 위한 여정 - 2\n"
        + "인증 번호를 확인하고 change Token 받는 API")
    @ApiResponses({
        @ApiResponse(code = 403, message = "FORBIDDEN\n만료된 인증 번호(I02)"),
        @ApiResponse(code = 404, message = "NOT FOUND\n일치하지 않는 인증 코드(I03)")
    })
    public ResponseEntity<ChangeTokenResponse> findPwCheckCertifyCode(@RequestBody CheckPhoneRequest request) {
        return ResponseEntity.ok().body(profileService.findPwCheckCertifyCode(request));
    }

    // 인증된 토큰으로 비밀번호 바꾸기 request: change_token, new_password / response: HttpStatus 204 No content
    @PostMapping("/members/find-pw/change-pw")
    @ApiOperation(value = "비밀번호 찾기(3) change Token 과 함께 비빌번호 변경", notes = "비밀번호를 찾기 위한 여정 - 3\n"
        + "change token 으로 인증을 거친 회원의 비밀번호를 변경하는 API\n"
        + "error response 는 나중에 추가됩니다.")
    private ResponseEntity<Void> findPwChangePw(@RequestBody FindPwChangeRequest request){
        profileService.findPwChangePw(request);
        return ResponseEntity.noContent().build();
    }
}

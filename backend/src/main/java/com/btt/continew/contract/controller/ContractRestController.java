package com.btt.continew.contract.controller;

import com.btt.continew.contract.controller.dto.request.ContractAgreeRequest;
import com.btt.continew.contract.controller.dto.request.ContractRequest;
import com.btt.continew.contract.controller.dto.response.ContractAgreeResponse;
import com.btt.continew.contract.controller.dto.response.ContractResponse;
import com.btt.continew.contract.service.ContractService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"계약서"})
public class ContractRestController {

    private final ContractService contractService;

    public ContractRestController(ContractService contractService) {
        this.contractService = contractService;
    }

    @PostMapping("/auth/contracts/agree")
    @ApiOperation(value = "계약 요청 수락", notes = "계약 요청을 수락하는 API")
    @ApiResponses({
        @ApiResponse(code = 400, message = "BAD REQUEST\n이미 계약 요청을 수락한 회원(K04)"),
        @ApiResponse(code = 404, message = "NOT FOUND\n존재하지 않는 아이디(M01)\n존재하지 않는 매물(H01)\n"
            + "요청타입이 Seller나 Buyer가 아님(K01)"),
        @ApiResponse(code = 409, message = "CONFLICT\n로그인 중인 회원이 Seller가 아님(K02)\n"
            + "로그인 중인 회원이 Buyer가 아님(K03)")
    })
    public ResponseEntity<Void> agreeContract(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestBody ContractAgreeRequest request) {
        contractService.agreeContract(request, loginId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/auth/contracts/disagree")
    @ApiOperation(value = "계약 요청 거절", notes = "계약 요청을 거절하는 API")
    @ApiResponses({
        @ApiResponse(code = 400, message = "BAD REQUEST\n이미 끝난 계약 요청(K07)\n로그인한 회원과 관련있는 계약 요청이 아님(K06)"),
        @ApiResponse(code = 404, message = "NOT FOUND\n존재하지 않는 아이디(M01)\n존재하지 않는 매물(H01)\n존재하지 않는 계약 요청(K05)")
    })
    public ResponseEntity<Void> disagreeContract(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestBody ContractAgreeRequest request) {
        contractService.disagreeContract(request, loginId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/auth/contracts/agree")
    @ApiOperation(value = "계약 요청 조회", notes = "계약 요청을 조회하는 API\n"
        + "**해당 API 는 GET 이므로 쿼리스트링으로 전달해야 합니다.**\n"
        + "TMI: Spring 버전이 낮아 GET 에는 requestBody 가 안된다고 합니다.")
    @ApiResponses({
        @ApiResponse(code = 400, message = "BAD REQUEST\n로그인한 회원과 관련있는 계약 요청이 아님(K06)"),
        @ApiResponse(code = 404, message = "NOT FOUND\n존재하지 않는 아이디(M01)\n존재하지 않는 매물(H01)\n존재하지 않는 계약 요청(K05)")
    })
    public ResponseEntity<ContractAgreeResponse> viewContractAgree(
        @ApiParam(hidden = true) @AuthenticationPrincipal String loginId, @RequestParam(name = "house_id") Long houseId,
        @RequestParam(name = "seller") String seller, @RequestParam(name = "buyer") String buyer) {
        return ResponseEntity.ok().body(contractService.viewContractAgree(houseId, seller, buyer, loginId));
    }

    @PostMapping("/auth/contracts")
    @ApiOperation(value = "계약서 임시 저장 + 저장 후 다음 단계", notes = "계약서 임시 저장 기능과 저장 후 다음 단계 기능이 있는 API\n"
        + "RequestBody 속에 있는 next_level 이 true 면 다음 단계로, false 면 임시저장 입니다.\n"
        + "이 API 는 단계에 따라 입력 받는 값이 정해져있습니다. 다음은 단계별 입력받는 값입니다.\n"
        + "만일 단계에 해당되지 않는 값이 responseBody에 포함되어있더라도 값은 변하지 않습니다."
        + "-1단계-\n"
        + "1단계에서 작성 가능한 사람: 판매자\n"
        + "1단계에서 작성 가능한 항목:\n"
        + "house_id / 매물 아이디 (ex) 121\n"
        + "seller_login_id / 판매자(임차인) 로그인 아이디 (ex) seller1234\n"
        + "buyer_login_id / 구매자(신규임차인) 로그인 아이디 (ex) buyer1234\n"
        + "location / 소재지 (지번 주소 사용) (ex) 서울특별시 강남구 압구정동 369-1\n"
        + "area / 면적 (제곱미터 사용) (ex) 160\n"
        + "net_leasable_area / 전용면적 (제곱미터 사용) (ex) 84\n"
        + "contract_type / 전월세 타입 (\"전세\" / \"월세\") (ex) 월세\n"
        + "tenancy_deposit / 임차보증금 (ex) 5,000,000원\n"
        + "maintenance_fee / 관리비 (ex) 15,000원\n"
        + "contract_start / 계약기간 시작 (ex) 2022-02-02 \"yyyy-MM-dd\" 형식 유지 바람\n"
        + "contract_end / 계약기간 종료 (ex) 2022-06-02 \"yyyy-MM-dd\" 형식 유지 바람\n"
        + "total_premium / 총 권리금 (ex) 3,000원\n"
        + "down_payment / 계약금 (ex) 2,100원\n"
        + "middle_payment / 중도금 (ex) 1,100원\n"
        + "middle_date / 중도금 기간 (ex) 2022-01-31 \"yyyy-MM-dd\" 형식 유지 바람\n"
        + "balance_payment / 잔금 (ex) 1,000원\n"
        + "balance_date / 잔금 기간 (ex) 2022-02-01 \"yyyy-MM-dd\" 형식 유지 바람\n"
        + "seller_address / 임차인 주소 (ex) 대구광역시 북구 부끄로 11, 101동 123호\n"
        + "seller_name / 임차인 성명 (ex) 이사간\n"
        + "seller_birth / 임차인 생년월일 (ex) 1993-01-01 \"yyyy-MM-dd\" 형식 유지 바람\n"
        + "seller_phone / 임차인 전화 (ex) 01000000000\n\n"
        + "-2단계-\n"
        + "2단계에서 작성 가능한 사람: 구매자\n"
        + "2단계에서 작성 가능한 항목:\n"
        + "buyer_address / 신규임차인주소 (ex) 대구광역시 중구 가시키드나로 123, 102동 101호\n"
        + "buyer_name / 신규임차인 성명 (ex) 이사온\n"
        + "buyer_birth / 신규임차인 생년월일 (ex) 1995-01-01 \"yyyy-MM-dd\" 형식 유지 바람\n"
        + "buyer_phone / 신규임차인 전화 (ex) 01000000001\n"
        + "buyer_signature / 신규임차인 사인 (ex) 이미지 url\n\n"
        + "-3단계-\n"
        + "3단계에서 작성 가능한 사람: 판매자\n"
        + "3단계에서 작성 가능한 항목:\n"
        + "seller_signature / 임차인 사인 (ex) 이미지 url")
    public ResponseEntity<Void> saveContract(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestBody ContractRequest request) {
        contractService.saveContract(request, loginId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/auth/contracts")
    @ApiOperation(value = "계약서 파기", notes = "계약서를 파기하는 API\n"
        + "**해당 API 는 버그 예방 차원에서 데이터를 쿼리스트링으로 전달해야 합니다.**")
    public ResponseEntity<Void> deleteContract(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestParam(name = "house_id") Long houseId, @RequestParam(name = "seller") String seller,
        @RequestParam(name = "buyer") String buyer) {
        contractService.deleteContract(loginId, houseId, seller, buyer);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/auth/contracts")
    @ApiOperation(value = "계약서 조회", notes = "계약서를 조회하는 API\n"
        + "**해당 API 는 GET 이므로 쿼리스트링으로 전달해야 합니다.**\n"
        + "TMI: Spring 버전이 낮아 GET 에는 requestBody 가 안된다고 합니다.")
    public ResponseEntity<ContractResponse> viewContract(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestParam(name = "house_id") Long houseId, @RequestParam(name = "seller") String seller,
        @RequestParam(name = "buyer") String buyer) {
        return ResponseEntity.ok().body(contractService.viewContract(loginId, houseId, seller, buyer));
    }
}

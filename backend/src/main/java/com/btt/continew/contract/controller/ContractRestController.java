package com.btt.continew.contract.controller;

import com.btt.continew.contract.controller.dto.request.ContractAgreeRequest;
import com.btt.continew.contract.controller.dto.request.ContractRequest;
import com.btt.continew.contract.controller.dto.response.ContractAgreeResponse;
import com.btt.continew.contract.controller.dto.response.ContractResponse;
import com.btt.continew.contract.service.ContractService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public ResponseEntity<Void> agreeContract(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestBody ContractAgreeRequest request) {
        contractService.agreeContract(request, loginId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/auth/contracts/disagree")
    @ApiOperation(value = "계약 요청 거절", notes = "계약 요청을 거절하는 API")
    public ResponseEntity<Void> disagreeContract(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestBody ContractAgreeRequest request) {
        contractService.disagreeContract(request, loginId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/auth/contracts/agree")
    @ApiOperation(value = "계약 요청 조회", notes = "계약 요청을 조회하는 API\n"
        + "**해당 API 는 GET 이므로 쿼리스트링으로 전달해야 합니다.**\n"
        + "TMI: Spring 버전이 낮아 GET 에는 requestBody 가 안된다고 합니다.")
    public ResponseEntity<ContractAgreeResponse> viewContractAgree(
        @ApiParam(hidden = true) @AuthenticationPrincipal String loginId, @RequestParam(name = "house_id") Long houseId,
        @RequestParam(name = "seller") String seller, @RequestParam(name = "buyer") String buyer) {
        return ResponseEntity.ok().body(contractService.viewContractAgree(houseId, seller, buyer, loginId));
    }

    @PostMapping("/auth/contracts")
    @ApiOperation(value = "계약서 임시 저장 + 저장 후 다음 단계", notes = "계약서 임시 저장 기능과 저장 후 다음 단계 기능이 있는 API\n"
        + "RequestBody 속에 있는 next_level 이 true 면 다음 단계로, false 면 임시저장 입니다.")
    public ResponseEntity<Void> saveContract(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestBody ContractRequest request) {
        contractService.saveContract(request, loginId);
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

    //@DeleteMapping("/auth/contracts")
}

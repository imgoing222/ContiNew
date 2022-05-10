package com.btt.continew.contract.controller;

import com.btt.continew.contract.controller.dto.request.ContractAgreeRequest;
import com.btt.continew.contract.controller.dto.response.ContractAgreeResponse;
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
    @ApiOperation(value = "계약 요청 조회", notes = "계약 요청을 조회하는 API")
    public ResponseEntity<ContractAgreeResponse> viewContractAgree(
        @ApiParam(hidden = true) @AuthenticationPrincipal String loginId, @RequestParam(name = "house_id") Long houseId,
        @RequestParam(name = "seller") String seller, @RequestParam(name = "buyer") String buyer) {
        return ResponseEntity.ok().body(contractService.viewContractAgree(houseId, seller, buyer, loginId));
    }

}

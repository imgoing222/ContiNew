package com.btt.continew.contract.controller;

import com.btt.continew.contract.controller.dto.request.ContractAgreeRequest;
import com.btt.continew.contract.service.ContractService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"계약서"})
public class ContractRestController {

    private final ContractService contractService;

    public ContractRestController(ContractService contractService) {
        this.contractService = contractService;
    }

    @PostMapping("/contract/agree")
    @ApiOperation(value = "계약 시작 수락", notes = "계약 시작을 수락하는 API")
    public ResponseEntity<Void> agreeContract(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @RequestBody ContractAgreeRequest request) {
        contractService.agreeContract(request, loginId);
        return ResponseEntity.noContent().build();
    }
}

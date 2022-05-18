package com.btt.continew.contract.controller.dto.response;


import com.btt.continew.contract.domain.Contract;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class ContractMineResponse {

    @JsonProperty("seller_contracts")
    @ApiModelProperty(position = 0, notes = "판매 계약")
    List<ContractSimpleResponse> sellerContracts;

    @JsonProperty("buyer_contracts")
    @ApiModelProperty(position = 1, notes = "구매 계약")
    List<ContractSimpleResponse> buyerContracts;

    public ContractMineResponse() {
    }

    public ContractMineResponse(
        List<ContractSimpleResponse> sellerContracts,
        List<ContractSimpleResponse> buyerContracts) {
        this.sellerContracts = sellerContracts;
        this.buyerContracts = buyerContracts;
    }

    public static ContractMineResponse of(List<Contract> sellerContracts, List<Contract> buyerContracts) {
        return new ContractMineResponse(
            sellerContracts.stream()
                .map(ContractSimpleResponse::from)
                .collect(Collectors.toList()),
            buyerContracts.stream()
                .map(ContractSimpleResponse::from)
                .collect(Collectors.toList())
        );
    }
}

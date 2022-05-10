package com.btt.continew.contract.controller.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;

public class ContractAgreeResponse {

    @JsonProperty("house_id")
    @ApiModelProperty(notes = "매물 id", example = "1")
    private Long houseId;

    @JsonProperty("seller_agree")
    @ApiModelProperty(notes = "판매자 동의 내역", example = "true")
    private Boolean sellerAgree;

    @JsonProperty("buyer_agree")
    @ApiModelProperty(notes = "구매자 동의 내역", example = "false")
    private Boolean buyerAgree;

    public ContractAgreeResponse() {
    }

    public ContractAgreeResponse(Long houseId, Boolean sellerAgree, Boolean buyerAgree) {
        this.houseId = houseId;
        this.sellerAgree = sellerAgree;
        this.buyerAgree = buyerAgree;
    }

    public static ContractAgreeResponse of(Long houseId, Boolean sellerAgree, Boolean buyerAgree) {
        return new ContractAgreeResponse(houseId, sellerAgree, buyerAgree);
    }
}

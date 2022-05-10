package com.btt.continew.contract.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class ContractAgreeRequest {

    @JsonProperty("house_id")
    @ApiModelProperty(required = true, position = 1, notes = "매물 아이디", example = "121")
    private Long houseId;

    @JsonProperty("seller_login_id")
    @ApiModelProperty(required = true, position = 2, notes = "판매자(임차인) 로그인 아이디", example = "seller1234")
    private String sellerLoginId;

    @JsonProperty("buyer_login_id")
    @ApiModelProperty(required = true, position = 3, notes = "구매자(신규임차인) 로그인 아이디", example = "buyer1234")
    private String buyerLoginId;

    @JsonProperty("member_type")
    @ApiModelProperty(required = true, position = 4, notes = "API 요청자의 회원 구분 (seller, buyer)", example = "seller")
    private String memberType;

    public ContractAgreeRequest() {
    }

    public ContractAgreeRequest(Long houseId, String sellerLoginId, String buyerLoginId, String memberType) {
        this.houseId = houseId;
        this.sellerLoginId = sellerLoginId;
        this.buyerLoginId = buyerLoginId;
        this.memberType = memberType;
    }
}

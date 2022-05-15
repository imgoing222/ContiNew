package com.btt.continew.chatting.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class ChatRoomRequest {

    @JsonProperty("seller")
    @ApiModelProperty(position = 0, notes = "판매자", example = "ti-a-co")
    private String seller;

    @JsonProperty("buyer")
    @ApiModelProperty(position = 1, notes = "구매자", example = "bbang")
    private String buyer;

    @JsonProperty("sale")
    @ApiModelProperty(position = 2, notes = "매물 번호", example = "1")
    private Long sale;

    @JsonProperty("seller_id")
    @ApiModelProperty(position = 3, notes = "판매자 ID", example = "continew")
    private String sellerId;

    @JsonProperty("buyer_id")
    @ApiModelProperty(position = 4, notes = "구매자 ID", example = "btt")
    private String buyerId;

    public ChatRoomRequest(){

    }

    public ChatRoomRequest(String seller, String buyer, Long sale, String sellerId, String buyerId){
        this.seller = seller;
        this.buyer = buyer;
        this.sale = sale;
        this.sellerId = sellerId;
        this.buyerId = buyerId;
    }

}

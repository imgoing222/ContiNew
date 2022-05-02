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

    public ChatRoomRequest(){

    }

    public ChatRoomRequest(String seller, String buyer, Long sale){
        this.seller = seller;
        this.buyer = buyer;
        this.sale = sale;
    }

}

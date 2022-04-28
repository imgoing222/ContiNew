package com.btt.continew.chatting.controller.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class ChatRoomRequest {

    @JsonProperty("seller")
    private String seller;

    @JsonProperty("buyer")
    private String buyer;

    @JsonProperty("sale")
    private Long sale;

    public ChatRoomRequest(){

    }

    public ChatRoomRequest(String seller, String buyer, Long sale){
        this.seller = seller;
        this.buyer = buyer;
        this.sale = sale;
    }

}

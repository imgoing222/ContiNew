package com.btt.continew.chatting.domain;

import java.time.LocalDateTime;
import java.util.UUID;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChatRoom {

    @Id
    String roomId;
    String seller;
    String buyer;
    Long sale;

    String lastMessage;
    LocalDateTime lastMessageTime;


    @Builder
    public ChatRoom (String seller, String buyer, Long sale){

        this.roomId = UUID.randomUUID().toString();
        this.seller = seller;
        this.buyer = buyer;
        this.sale = sale;

    }
}

package com.btt.continew.chatting.controller.dto.response;

import com.btt.continew.chatting.domain.ChatRoom;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ChatRoomResponse {

    @JsonProperty("room_id")
    private String id;

    @JsonProperty("seller")
    private String seller;

    @JsonProperty("buyer")
    private String buyer;

    @JsonProperty("sale")
    private Long sale;

    @JsonProperty("last_message")
    private String lastMessage;

    @JsonProperty("last_message_time")
    private LocalDateTime lastMessageTime;

    public ChatRoomResponse(){

    }

    public ChatRoomResponse(String id, String seller, String buyer, Long sale, String lastMessage, LocalDateTime lastMessageTime){
        this.id = id;
        this.seller = seller;
        this.buyer = buyer;
        this.sale = sale;
        this.lastMessage = lastMessage;
        this.lastMessageTime = lastMessageTime;
    }

    public static ChatRoomResponse from (ChatRoom chatRoom){
        return new ChatRoomResponse(
            chatRoom.getId(),
            chatRoom.getSeller(),
            chatRoom.getBuyer(),
            chatRoom.getSale(),
            chatRoom.getLastMessage(),
            chatRoom.getLastMessageTime()
        );
    }

}

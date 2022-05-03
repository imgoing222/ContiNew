package com.btt.continew.chatting.controller.dto.request;

import com.btt.continew.chatting.domain.ChatMessage.MessageType;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class ChatMessageRequest {

    @JsonProperty("message_type")
    MessageType type;

    @JsonProperty("room_id")
    String roomId;

    @JsonProperty("sender")
    String sender;

    @JsonProperty("content")
    String content;

    public ChatMessageRequest(){

    }

    public ChatMessageRequest(MessageType type, String roomId, String sender, String content){
        this.type = type;
        this.roomId = roomId;
        this.sender = sender;
        this.content = content;
    }
}

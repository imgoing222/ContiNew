package com.btt.continew.chatting.controller.dto.response;

import com.btt.continew.chatting.domain.ChatMessage;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ChatMessageResponse {

    @JsonProperty("room_id")
    private String room_id;

    @JsonProperty("sender")
    private String sender;

    @JsonProperty("content")
    private String content;

    @JsonProperty("read_at")
    private LocalDateTime read_at;

    public ChatMessageResponse(){

    }

    public ChatMessageResponse(String room_id, String sender, String content, LocalDateTime read_at){
        this.room_id = room_id;
        this.sender = sender;
        this.content = content;
        this.read_at = read_at;
    }

    public static ChatMessageResponse from (ChatMessage chatMessage){
        return new ChatMessageResponse(
            chatMessage.getRoomId(),
            chatMessage.getSender(),
            chatMessage.getContent(),
            chatMessage.getRead_at()
        );
    }
}

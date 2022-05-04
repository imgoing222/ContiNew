package com.btt.continew.chatting.controller.dto.request;

import com.btt.continew.chatting.domain.ChatMessage.MessageType;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class ChatMessageRequest {

    @JsonProperty("message_type")
    @ApiModelProperty(position = 0, notes = "메시지 타입", example = "ENTER")
    MessageType type;

    @JsonProperty("room_id")
    @ApiModelProperty(position = 1, notes = "룸 아이디", example = "41a35100-e850-472d-b66d-53a5cad457ae")
    String roomId;

    @JsonProperty("sender")
    @ApiModelProperty(position = 2, notes = "보내는 사람", example = "socket")
    String sender;

    @JsonProperty("content")
    @ApiModelProperty(position = 3, notes = "메시지 내용", example = "받고 큰거 한장 더!")
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

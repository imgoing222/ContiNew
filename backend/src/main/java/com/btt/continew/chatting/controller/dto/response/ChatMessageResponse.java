package com.btt.continew.chatting.controller.dto.response;

import com.btt.continew.chatting.domain.ChatMessage;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ChatMessageResponse {

    @JsonProperty("room_id")
    @ApiModelProperty(position = 0, notes = "룸 아이디", example = "41a35100-e850-472d-b66d-53a5cad457ae")
    private String room_id;

    @JsonProperty("sender")
    @ApiModelProperty(position = 1, notes = "보내는 사람", example = "socket")
    private String sender;

    @JsonProperty("content")
    @ApiModelProperty(position = 2, notes = "메시지 내용", example = "받고 큰거 두장 더!!!!")
    private String content;

    @JsonProperty("read_at")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @ApiModelProperty(position = 3, notes = "마지막 메시지 시간", example = "2022-3-13 14:59:51 // null 이면 읽지 않음")
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

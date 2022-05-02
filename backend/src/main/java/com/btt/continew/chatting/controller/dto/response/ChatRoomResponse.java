package com.btt.continew.chatting.controller.dto.response;

import com.btt.continew.chatting.domain.ChatRoom;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ChatRoomResponse {

    @JsonProperty("room_id")
    @ApiModelProperty(position = 0, notes = "룸 아이디", example = "e1757da8-81c5-40e4-8fe0-f22d4031f6a4")
    private String id;

    @JsonProperty("seller")
    @ApiModelProperty(position = 1, notes = "판매자", example = "ti-a-co")
    private String seller;

    @JsonProperty("buyer")
    @ApiModelProperty(position = 2, notes = "구매자", example = "bbang")
    private String buyer;

    @JsonProperty("sale")
    @ApiModelProperty(position = 3, notes = "매물 번호", example = "1")
    private Long sale;

    @JsonProperty("last_message")
    @ApiModelProperty(position = 4, notes = "마지막 메시지", example = "뭔지 모르지만, 저기에다 마지막 잎새 하나를 남겨 둬서...")
    private String lastMessage;

    @JsonProperty("last_message_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @ApiModelProperty(position = 5, notes = "마지막 메시지 시간", example = "2022-3-13 14:59:51")
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

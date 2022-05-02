package com.btt.continew.chatting.controller.dto.response;

import com.btt.continew.chatting.domain.ChatRoom;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
public class ChatRoomsResponse {

    @JsonProperty("chat_rooms")
    @ApiModelProperty(position = 0, notes = "채팅 방 목록 목록")
    private List<ChatRoomResponse> chatRooms;

    @JsonProperty("total_page_count")
    @ApiModelProperty(position = 1, notes = "채팅방 총 페이지 수", example = "2")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    @ApiModelProperty(position = 2, notes = "채팅방 현재 페이지", example = "1")
    private int currentPageCount;

    public ChatRoomsResponse(){

    }

    public ChatRoomsResponse(List<ChatRoomResponse> chatRooms, int totalPageCount, int currentPageCount){
        this.chatRooms = chatRooms;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static ChatRoomsResponse from(Page<ChatRoom> chatRooms){
        return new ChatRoomsResponse(
            chatRooms.stream()
                .map(ChatRoomResponse::from)
                .collect(Collectors.toList()),
            chatRooms.getTotalPages(),
            chatRooms.getNumber()
        );
    }
}

package com.btt.continew.chatting.controller.dto.response;

import com.btt.continew.chatting.domain.ChatMessage;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
public class ChatMessagesResponse {

    @JsonProperty("chat_message")
    @ApiModelProperty(position = 0, notes = "메시지 목록")
    private List<ChatMessageResponse> chatMessages;

    @JsonProperty("total_page_count")
    @ApiModelProperty(position = 1, notes = "메시지 총 페이지 수", example = "2")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    @ApiModelProperty(position = 2, notes = "메시지 현재 페이지", example = "1")
    private int currentPageCount;

    public ChatMessagesResponse(){

    }

    public ChatMessagesResponse(List<ChatMessageResponse> chatMessages, int totalPageCount, int currentPageCount){
        this.chatMessages = chatMessages;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static ChatMessagesResponse from(Page<ChatMessage> chatMessages){
        return new ChatMessagesResponse(
            chatMessages.stream()
                .map(ChatMessageResponse::from)
                .collect(Collectors.toList()),
            chatMessages.getTotalPages(),
            chatMessages.getNumber()
        );
    }
}

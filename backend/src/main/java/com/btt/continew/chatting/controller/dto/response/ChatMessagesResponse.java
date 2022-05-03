package com.btt.continew.chatting.controller.dto.response;

import com.btt.continew.chatting.domain.ChatMessage;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
public class ChatMessagesResponse {

    @JsonProperty("chat_message")
    private List<ChatMessageResponse> chatMessages;

    @JsonProperty("total_page_count")
    private int totalPageCount;

    @JsonProperty("current_page_count")
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

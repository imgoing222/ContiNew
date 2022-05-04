package com.btt.continew.chatting.controller;

import com.btt.continew.auth.infrastructure.JwtTokenProvider;
import com.btt.continew.chatting.controller.dto.request.ChatMessageRequest;
import com.btt.continew.chatting.controller.dto.response.ChatMessagesResponse;
import com.btt.continew.chatting.domain.ChatMessage;
import com.btt.continew.chatting.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.web.PageableDefault;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@RequiredArgsConstructor
@Controller
public class ChatMessageRestController {

    private final ChannelTopic channelTopic;
    private final ChatMessageService chatMessageService;

    @MessageMapping("/chat/message")
    public void message(ChatMessageRequest request) {

        System.out.println("2-1. 메시징");
        chatMessageService.createMessage(channelTopic, request);

    }


    @GetMapping("/api/chat/messages/")
    @ResponseBody
    public ChatMessagesResponse getChatMessage(
        @PageableDefault(sort = "created_at", direction = Direction.DESC)Pageable pageable,
        @RequestParam("room_id") String roomId){

        System.out.println("2-3. 메시지 목록");

        return chatMessageService.showChatMessage(roomId, pageable);
    }
}

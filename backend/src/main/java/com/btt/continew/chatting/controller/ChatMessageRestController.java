package com.btt.continew.chatting.controller;

import com.btt.continew.auth.infrastructure.JwtTokenProvider;
import com.btt.continew.chatting.controller.dto.request.ChatMessageRequest;
import com.btt.continew.chatting.domain.ChatMessage;
import com.btt.continew.chatting.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

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
}

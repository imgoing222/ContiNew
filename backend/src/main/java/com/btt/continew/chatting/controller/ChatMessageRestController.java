package com.btt.continew.chatting.controller;

import com.btt.continew.auth.infrastructure.JwtTokenProvider;
import com.btt.continew.chatting.domain.ChatMessage;
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

    private final RedisTemplate<String, Object> redisTemplate;
    private final ChannelTopic channelTopic;


    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {

        System.out.println("2-1. 메시징");
        if (ChatMessage.MessageType.ENTER.equals(message.getType())) {
            message.setSender("[입장]");
        }
        redisTemplate.convertAndSend(channelTopic.getTopic(), message);
    }
}

package com.btt.continew.chatting.service;

import com.btt.continew.chatting.controller.dto.request.ChatMessageRequest;
import com.btt.continew.chatting.domain.ChatMessage;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private static final String CHAT_MESSAGE = "CHAT_MESSAGE";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, ChatMessage> opsHashChatMessage;

    @PostConstruct
    private void init() { opsHashChatMessage = redisTemplate.opsForHash(); }

    @Transactional
    public void createMessage(ChannelTopic channelTopic, ChatMessageRequest request) {

        ChatMessage chatMessage = ChatMessage.create(request);

        opsHashChatMessage.put(CHAT_MESSAGE, chatMessage.getId(), chatMessage);
        redisTemplate.convertAndSend(channelTopic.getTopic(), chatMessage);
    }
}

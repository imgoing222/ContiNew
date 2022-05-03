package com.btt.continew.chatting.redis;

import com.btt.continew.chatting.domain.ChatMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber {

    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messagingTemplate;


    public void sendMessage(String publishMessage) {
        System.out.println("2-2. 레디스 구독 샌드 메시지");
        try {

            ChatMessage chatMessage = objectMapper.readValue(publishMessage, ChatMessage.class);

            messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessage.getRoomId(), chatMessage);
        } catch (Exception e) {
            log.error("Exception {}", e);
        }
    }
}

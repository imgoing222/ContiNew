package com.btt.continew.chatting.redis;

import com.btt.continew.chatting.controller.dto.request.ChatMessageRequest;
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
        System.out.println("4-5. 레디스 구독 처리");
        try {
            System.out.println("publishMessage : "+publishMessage);
            ChatMessageRequest chatMessage = objectMapper.readValue(publishMessage, ChatMessageRequest.class);
            System.out.println("4-6. 레디스 메시지 전달");
            messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessage.getRoomId(), chatMessage);
        } catch (Exception e) {
            log.error("Exception {}", e);
        }
    }
}

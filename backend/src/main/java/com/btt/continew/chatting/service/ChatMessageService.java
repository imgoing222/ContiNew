package com.btt.continew.chatting.service;

import com.btt.continew.chatting.domain.ChatMessage;
import com.btt.continew.chatting.domain.ChatMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;

    public ChatMessageService(ChatMessageRepository chatMessageRepository){
        this.chatMessageRepository = chatMessageRepository;
    }

    @Transactional
    public void createChatMessage() {
        ChatMessage chatMessage = new ChatMessage(null,"수신자","발신자","레디스테스트");
        chatMessageRepository.save(chatMessage);
    }
}

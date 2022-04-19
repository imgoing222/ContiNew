package com.btt.continew.chatting.controller;

import com.btt.continew.chatting.service.ChatMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chatting")
public class ChatMessageRestController {

    private final ChatMessageService chatMessageService;

    public ChatMessageRestController(ChatMessageService chatMessageService){
        this.chatMessageService = chatMessageService;
    }

    @PostMapping
    public ResponseEntity<Void> postChatting(){

        chatMessageService.createChatMessage();

        return ResponseEntity.noContent().build();
    }
}

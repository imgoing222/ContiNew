package com.btt.continew.chatting.controller;

import com.btt.continew.chatting.domain.ChatMessage;
import com.btt.continew.chatting.domain.ChatRoom;
import com.btt.continew.chatting.domain.ChatRoomRepository;
import com.btt.continew.chatting.redis.RedisPublisher;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Controller
//@RequestMapping("/api/chatting")
public class ChatMessageRestController {

    private final RedisPublisher redisPublisher;
    private final ChatRoomRepository chatRoomRepository;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message){
        if(ChatMessage.MessageType.ENTER.equals(message.getType())){
            chatRoomRepository.enterChatRoom(message.getRoomId());
            message.setContent(message.getSender() + "님과의 대화를 시작합니다.");
        }

        redisPublisher.publish(chatRoomRepository.getTopic(message.getRoomId()),message);
    }

//    private final ChatService chatService;
//
//    @PostMapping
//    public ChatRoom createRoom(@RequestParam String name){
//        return chatService.createRoom(name);
//    }
//
//    @GetMapping
//    public List<ChatRoom> findAllRoom(){
//        return chatService.findAllRoom();
//    }
}

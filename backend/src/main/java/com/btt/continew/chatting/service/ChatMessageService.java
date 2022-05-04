package com.btt.continew.chatting.service;

import com.btt.continew.chatting.controller.dto.request.ChatMessageRequest;
import com.btt.continew.chatting.controller.dto.response.ChatMessagesResponse;
import com.btt.continew.chatting.domain.ChatMessage;
import com.btt.continew.chatting.domain.ChatRoom;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private static final String CHAT_MESSAGE = "CHAT_MESSAGE";
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, ChatMessage> opsHashChatMessage;
    private HashOperations<String, String, ChatRoom> opsHasChatRoom;

    @PostConstruct
    private void init() {
        opsHashChatMessage = redisTemplate.opsForHash();
        opsHasChatRoom = redisTemplate.opsForHash();
    }


    @Transactional
    public void createMessage(ChatMessageRequest request) {
        System.out.println("4-3. 메시지 생성 ");
        ChatMessage chatMessage = ChatMessage.create(request);

        System.out.println("4-4. 라스트 메시지 세팅 ");
        ChatRoom chatRoom = opsHasChatRoom.get(CHAT_ROOMS, request.getRoomId());
        chatRoom.setLastMessage(request.getContent());
        chatRoom.setLastMessageTime(LocalDateTime.now());
        opsHasChatRoom.put(CHAT_ROOMS, chatRoom.getId(), chatRoom);

        System.out.println("4-5. 메시지 저장 및 전달 ");
        opsHashChatMessage.put(CHAT_MESSAGE, chatMessage.getId(), chatMessage);
    }

    @Transactional
    public ChatMessagesResponse showChatMessage(String roomId,Pageable pageable) {
        System.out.println("5-2. 메시지 조회");
        List<ChatMessage> temps = opsHashChatMessage.values(CHAT_MESSAGE);

        List<ChatMessage> chatMessageList = new ArrayList<>();

        System.out.println("5-3. 메시지 골라내기");
        for (ChatMessage temp : temps){

            if(temp.getRoomId().equals(roomId)){
                chatMessageList.add(temp);
            }
        }

        System.out.println("5-4. 메시지 페이지 네이션");
        int start = (int)pageable.getOffset();
        int end = Math.min((start+pageable.getPageSize()), chatMessageList.size());
        Page<ChatMessage> chatMessages = new PageImpl<>(chatMessageList.subList(start,end),pageable,chatMessageList.size());

        System.out.println("5-4. 메시지 리스트 반환");
        return ChatMessagesResponse.from(chatMessages);
    }
}

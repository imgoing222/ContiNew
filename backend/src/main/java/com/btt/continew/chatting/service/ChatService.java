package com.btt.continew.chatting.service;

import com.btt.continew.chatting.controller.dto.request.ChatRoomRequest;
import com.btt.continew.chatting.controller.dto.response.ChatRoomsResponse;
import com.btt.continew.chatting.domain.ChatRoom;
import com.btt.continew.chatting.domain.ChatRoomRepository;
import com.btt.continew.member.domain.Member;
import com.btt.continew.member.service.MemberService;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, ChatRoom> opsHashChatRoom;

    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash();
    }

    @Transactional
    public ChatRoom createChatRoom(ChatRoomRequest request){

        ChatRoom chatRoom = ChatRoom.create(request);

        opsHashChatRoom.put(CHAT_ROOMS,chatRoom.getId(),chatRoom);

        return chatRoom;
    }


//    @Transactional
//    public ChatRoomsResponse showChatRoom(Pageable pageable, String id){
//        Member member = memberService.findByLoginId(id);
//
//        Page<ChatRoom> chatRooms = chatRoomRepository.findAllBySellerOrBuyer(member,member,pageable);
//
//        return ChatRoomsResponse.from(chatRooms);
//    }
}

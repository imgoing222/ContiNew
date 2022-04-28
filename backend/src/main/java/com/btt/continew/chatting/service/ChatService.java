package com.btt.continew.chatting.service;

import com.btt.continew.chatting.controller.dto.request.ChatRoomRequest;
import com.btt.continew.chatting.controller.dto.response.ChatRoomsResponse;
import com.btt.continew.chatting.domain.ChatRoom;
import com.btt.continew.chatting.domain.ChatRoomRepository;
import com.btt.continew.member.domain.Member;
import com.btt.continew.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatService {

    MemberService memberService;
    ChatRoomRepository chatRoomRepository;

    @Transactional
    public ChatRoom createChatRoom(ChatRoomRequest request){

        ChatRoom chatRoom = ChatRoom.builder()
            .seller(request.getSeller())
            .buyer(request.getBuyer())
            .sale(request.getSale())
            .build();

        chatRoomRepository.save(chatRoom);

        return chatRoom;
    }

}

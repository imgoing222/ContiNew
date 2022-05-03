package com.btt.continew.chatting.service;

import com.btt.continew.chatting.controller.dto.request.ChatRoomRequest;
import com.btt.continew.chatting.controller.dto.response.ChatRoomResponse;
import com.btt.continew.chatting.controller.dto.response.ChatRoomsResponse;
import com.btt.continew.chatting.domain.ChatRoom;
import com.btt.continew.member.domain.Member;
import com.btt.continew.member.service.MemberService;
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
public class ChatRoomService {

    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, ChatRoom> opsHashChatRoom;

    private final MemberService memberService;

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


    @Transactional
    public ChatRoomsResponse showChatRoom(Pageable pageable, String id){
        List<ChatRoom> temps = opsHashChatRoom.values(CHAT_ROOMS);

        Member member = memberService.findByLoginId(id);

        List<ChatRoom> chatRoomList = new ArrayList<>();

        for (ChatRoom temp : temps){
            // 구매자
            if(temp.getBuyer().equals(member.getLoginId())){
                chatRoomList.add(temp);

                continue;
            }

            // 판매자
            if (temp.getSeller().equals(member.getLoginId())){
                chatRoomList.add(temp);
            }
        }

        int start = (int)pageable.getOffset();
        int end = Math.min((start+pageable.getPageSize()), chatRoomList.size());
        Page<ChatRoom> chatRooms = new PageImpl<>(chatRoomList.subList(start,end),pageable,chatRoomList.size());


        return ChatRoomsResponse.from(chatRooms);
    }

    public ChatRoomResponse showChatRoomDetail(String roomId) {
        return ChatRoomResponse.from(opsHashChatRoom.get(CHAT_ROOMS,roomId));
    }
}

package com.btt.continew.chatting.service;

import com.btt.continew.chatting.controller.dto.request.ChatRoomRequest;
import com.btt.continew.chatting.controller.dto.response.ChatRoomResponse;
import com.btt.continew.chatting.controller.dto.response.ChatRoomsResponse;
import com.btt.continew.chatting.domain.ChatMessage;
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
    private static final String CHAT_MESSAGE = "CHAT_MESSAGE";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, ChatRoom> opsHashChatRoom;
    private HashOperations<String, String, ChatMessage> opsHashChatMessage;

    private final MemberService memberService;

    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash();
        opsHashChatMessage = redisTemplate.opsForHash();
    }

    @Transactional
    public ChatRoom createChatRoom(ChatRoomRequest request){
        System.out.println("1-2. 방 생성");
        ChatRoom chatRoom = ChatRoom.create(request);
//        ChatMessage chatMessage = ChatMessage.enterMessage(chatRoom.getId());

        System.out.println("1-3. 방 저장");
        opsHashChatRoom.put(CHAT_ROOMS,chatRoom.getId(),chatRoom);
//        opsHashChatMessage.put(CHAT_MESSAGE, chatMessage.getId(), chatMessage);

        return chatRoom;
    }


    @Transactional
    public ChatRoomsResponse showChatRoom(Pageable pageable, String id){
        System.out.println("2-2. 방 조회");
        List<ChatRoom> temps = opsHashChatRoom.values(CHAT_ROOMS);

        Member member = memberService.findByLoginId(id);

        List<ChatRoom> chatRoomList = new ArrayList<>();

        System.out.println("2-3. 방 골라내기");
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

        System.out.println("2-4. 방 페이지 네이션");
        int start = (int)pageable.getOffset();
        int end = Math.min((start+pageable.getPageSize()), chatRoomList.size());
        Page<ChatRoom> chatRooms = new PageImpl<>(chatRoomList.subList(start,end),pageable,chatRoomList.size());

        System.out.println("2-5. 방 반환");
        return ChatRoomsResponse.from(chatRooms);
    }

    @Transactional
    public ChatRoomResponse showChatRoomDetail(String roomId) {
        System.out.println("3-2. 방 세부 사항 반환");
        return ChatRoomResponse.from(opsHashChatRoom.get(CHAT_ROOMS,roomId));
    }
}

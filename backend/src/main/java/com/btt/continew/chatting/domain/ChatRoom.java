package com.btt.continew.chatting.domain;

import com.btt.continew.chatting.controller.dto.request.ChatRoomRequest;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash("chat_room")
public class ChatRoom implements Serializable {

    @Id
    String id;
    String seller;
    String buyer;
    Long sale;

    String lastMessage;
    LocalDateTime lastMessageTime;



    public static ChatRoom create (ChatRoomRequest request){
        ChatRoom chatRoom = new ChatRoom();

        chatRoom.id = UUID.randomUUID().toString();
        chatRoom.seller = request.getSeller();
        chatRoom.buyer = request.getBuyer();
        chatRoom.sale = request.getSale();
        chatRoom.lastMessage = "";
        chatRoom.lastMessageTime = LocalDateTime.now();

        return chatRoom;
    }
}

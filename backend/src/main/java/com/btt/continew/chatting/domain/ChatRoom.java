package com.btt.continew.chatting.domain;

import com.btt.continew.chatting.controller.dto.request.ChatRoomRequest;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;
import javax.persistence.Column;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash("chat_room")
public class ChatRoom implements Serializable {

    @Id
    String id;
    @Column(name = "seller")
    String seller;

    @Column(name = "buyer")
    String buyer;

    @Column(name = "sale")
    Long sale;

    @Column(name = "last_message")
    String lastMessage;

    @Column(name = "last_message_time")
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

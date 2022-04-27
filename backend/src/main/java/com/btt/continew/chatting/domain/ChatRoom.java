package com.btt.continew.chatting.domain;

import java.util.UUID;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChatRoom {

    @Id
    String roomId;
    String name;

    public static ChatRoom create(String name){
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.name = name;

        return chatRoom;
    }
}

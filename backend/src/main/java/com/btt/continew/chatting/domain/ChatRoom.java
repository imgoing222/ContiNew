package com.btt.continew.chatting.domain;

import com.btt.continew.chatting.domain.ChatMessage.MessageType;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.socket.WebSocketSession;

@Setter
@Getter
public class ChatRoom {

    @Id
    String roomId;
    String name;
//    Set<WebSocketSession> sessions = new HashSet<>();
    public static ChatRoom create(String name){
        System.out.println("생성");
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.name = name;

        return chatRoom;
    }
//
//    @Builder
//    public ChatRoom(String roomId, String name){
//        this.roomId = roomId;
//        this.name = name;
//    }

//    public void handleActions(WebSocketSession session, ChatMessage chatMessage, ChatService chatService){
//        if(chatMessage.getType().equals(MessageType.ENTER)){
//            sessions.add(session);
//            chatMessage.setContent(chatMessage.getReceiver() + "님과의 대화를 시작합니다.");
//        }
//        sendMessage(chatMessage,chatService);
//    }
//
//    public <T> void sendMessage(T message, ChatService chatService){
//        sessions.parallelStream().forEach(session -> chatService.sendMessage(session,message));
//    }

}

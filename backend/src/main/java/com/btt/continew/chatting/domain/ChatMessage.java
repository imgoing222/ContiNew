package com.btt.continew.chatting.domain;

import com.btt.continew.chatting.controller.dto.request.ChatMessageRequest;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;

@Setter
@Getter
@RedisHash("message")
public class ChatMessage implements Serializable {
    public enum MessageType{
        ENTER, TALK
    }

    @Id
    @Column(name = "id")
    String id;

    @Column(name = "type")
    MessageType type;

    @Column(name = "room_id")
    String roomId;

    @Column(name = "sender")
    String sender;

    @Column(name = "content")
    String content;

    @Column(name = "read_at")
    LocalDateTime read_at;

    @Column(name = "created_at")
    LocalDateTime createdAt;


    public static ChatMessage create (ChatMessageRequest request){
        ChatMessage chatMessage = new ChatMessage();

        chatMessage.id = UUID.randomUUID().toString();
        chatMessage.type = request.getType();
        chatMessage.roomId = request.getRoomId();
        chatMessage.sender = request.getSender();
        chatMessage.content = request.getContent();
        chatMessage.createdAt = request.getCreated_at();

        return chatMessage;
    }

    public static ChatMessage enterMessage( String roomId){
        ChatMessage chatMessage = new ChatMessage();

        chatMessage.id = UUID.randomUUID().toString();
        chatMessage.type = MessageType.ENTER;
        chatMessage.roomId = roomId;
        chatMessage.content = "어서오세요";
        chatMessage.createdAt = LocalDateTime.now();

        return chatMessage;
    }
}

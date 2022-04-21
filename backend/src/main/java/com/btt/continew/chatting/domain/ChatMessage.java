package com.btt.continew.chatting.domain;

import java.time.LocalDateTime;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;

@Setter
@Getter
@RedisHash("message")
public class ChatMessage {
    public enum MessageType{
        ENTER, TALK
    }

    @Id
    String id;

    MessageType type;

    String roomId;
    String sender;
    String receiver;
    String content;
    LocalDateTime read_at;


}

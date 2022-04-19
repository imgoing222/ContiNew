package com.btt.continew.chatting.domain;

import com.btt.continew.global.domain.BaseEntity;
import java.time.LocalDateTime;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

@Getter
@RedisHash("message")
public class ChatMessage extends BaseEntity {
    @Id
    String id;

    String sender;
    String receiver;
    String content;
    LocalDateTime read_at;

    @Builder
    public ChatMessage(String id, String sender, String receiver, String content){
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
    }

}

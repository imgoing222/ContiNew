package com.btt.continew.chatting.handler;


import com.btt.continew.auth.infrastructure.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        System.out.println("0-1. stomp 연결\n"+message);
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        System.out.println("0-2. accessor 목적지 : "+ accessor.getDestination());
        if (StompCommand.CONNECT == accessor.getCommand()) {
            jwtTokenProvider.resolveAccessToken(accessor.getFirstNativeHeader("Authorization").substring(7));
        }
        System.out.println("0-3. stomp 종료");
        return message;
    }
}
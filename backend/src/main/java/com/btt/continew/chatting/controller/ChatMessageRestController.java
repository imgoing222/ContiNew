package com.btt.continew.chatting.controller;

import com.btt.continew.chatting.controller.dto.request.ChatMessageRequest;
import com.btt.continew.chatting.controller.dto.response.ChatMessagesResponse;
import com.btt.continew.chatting.service.ChatMessageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.web.PageableDefault;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@RequiredArgsConstructor
@Controller
@Api(tags = {"메시지"})
public class ChatMessageRestController {

    private final ChannelTopic channelTopic;
    private final ChatMessageService chatMessageService;
    private final RedisTemplate<String, Object> redisTemplate;

    @MessageMapping("/chat/message")
    public void message(ChatMessageRequest request) {

        redisTemplate.convertAndSend(channelTopic.getTopic(), request);

        chatMessageService.createMessage(request);

    }


    @GetMapping("/api/chat/messages/")
    @ApiOperation(value = "메시지 조회", notes = "<b>(로그인 필요)</b> 메시지 조회 API")
    @ApiImplicitParam(name = "room_id", value = "방 번호",example = "e1757da8-81c5-40e4-8fe0-f22d4031f6a4",required = true)
    @ResponseBody
    public ChatMessagesResponse getChatMessage(
        @PageableDefault(sort = "created_at", direction = Direction.DESC)Pageable pageable,
        @RequestParam("room_id") String roomId){

        return chatMessageService.showChatMessage(roomId, pageable);
    }
}

package com.btt.continew.chatting.controller;

import com.btt.continew.auth.infrastructure.JwtTokenProvider;
import com.btt.continew.chatting.controller.dto.request.ChatRoomRequest;
import com.btt.continew.chatting.controller.dto.response.ChatRoomsResponse;
import com.btt.continew.chatting.domain.ChatRoom;
import com.btt.continew.chatting.domain.ChatRoomRepository;
import com.btt.continew.chatting.service.ChatService;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
@RequestMapping("/chat")
public class ChatRoomRestController {

    private final ChatService chatService;


    @PostMapping("/room")
    @ResponseBody
    public ChatRoom postRoom(@RequestBody ChatRoomRequest request) {
        System.out.println("포스트 룸");
        return chatService.createChatRoom(request);
    }



}

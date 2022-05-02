package com.btt.continew.chatting.controller;


import com.btt.continew.chatting.controller.dto.request.ChatRoomRequest;
import com.btt.continew.chatting.controller.dto.response.ChatRoomsResponse;
import com.btt.continew.chatting.domain.ChatRoom;
import com.btt.continew.chatting.service.ChatService;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
@RequestMapping("/api/chat")
public class ChatRoomRestController {

    private final ChatService chatService;

    @GetMapping("/room")
    @ResponseBody
    public ResponseEntity<ChatRoomsResponse> getRoom(
        @PageableDefault(sort = "last_message_time", direction = Direction.DESC)Pageable pageable,
        @ApiParam(hidden = true) @AuthenticationPrincipal String loginId
    ) {
        System.out.println("겟룸");
        return ResponseEntity.ok().body(chatService.showChatRoom(pageable,loginId));
    }

    @PostMapping("/room")
    @ResponseBody
    public ChatRoom postRoom(@RequestBody ChatRoomRequest request) {
        System.out.println("포스트 룸");
        return chatService.createChatRoom(request);
    }

    @GetMapping("/room/{room_id}")
    public ChatRoom getRoomDetail(
        @RequestParam(value = "room_id") String roomId){

        System.out.println("겟룸 디테일");
        return chatService.showChatRoomDetail(roomId);
    }
}

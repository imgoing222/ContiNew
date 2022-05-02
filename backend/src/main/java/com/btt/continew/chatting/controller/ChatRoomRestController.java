package com.btt.continew.chatting.controller;


import com.btt.continew.chatting.controller.dto.request.ChatRoomRequest;
import com.btt.continew.chatting.controller.dto.response.ChatRoomResponse;
import com.btt.continew.chatting.controller.dto.response.ChatRoomsResponse;
import com.btt.continew.chatting.domain.ChatRoom;
import com.btt.continew.chatting.service.ChatService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
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
@Api(tags = {"채팅방"})
@RequestMapping("/api/chat")
public class ChatRoomRestController {

    private final ChatService chatService;

    @GetMapping("/room")
    @ApiOperation(value = "채팅방 목록 조회", notes = "<b>(로그인 필요)</b> 채팅방 목록 조회 API API")

    @ResponseBody
    public ResponseEntity<ChatRoomsResponse> getRoom(
        @PageableDefault(sort = "last_message_time", direction = Direction.DESC)Pageable pageable,
        @ApiParam(hidden = true) @AuthenticationPrincipal String loginId
    ) {
        System.out.println("겟룸");
        return ResponseEntity.ok().body(chatService.showChatRoom(pageable,loginId));
    }

    @PostMapping("/room")
    @ApiOperation(value = "채팅방 생성", notes = "<b>(로그인 필요)</b> 채팅방 생성 API")
    @ResponseBody
    public ChatRoom postRoom(@RequestBody ChatRoomRequest request) {
        System.out.println("포스트 룸");
        return chatService.createChatRoom(request);
    }

    @GetMapping("/room/{room_id}")
    @ApiOperation(value = "채팅방 조회", notes = "<b>(로그인 필요)</b> 채팅방 조회 API")
    @ApiImplicitParam(name = "room_id", value = "방 번호",example = "e1757da8-81c5-40e4-8fe0-f22d4031f6a4",required = true,type = "REQEUST_HEADER")
    @ResponseBody
    public ChatRoomResponse getRoomDetail(
        @RequestParam(value = "room_id") String roomId){

        System.out.println("겟룸 디테일");
        return chatService.showChatRoomDetail(roomId);
    }
}

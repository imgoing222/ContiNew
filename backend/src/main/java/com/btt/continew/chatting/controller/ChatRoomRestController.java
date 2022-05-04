package com.btt.continew.chatting.controller;


import com.btt.continew.chatting.controller.dto.request.ChatRoomRequest;
import com.btt.continew.chatting.controller.dto.response.ChatMessagesResponse;
import com.btt.continew.chatting.controller.dto.response.ChatRoomResponse;
import com.btt.continew.chatting.controller.dto.response.ChatRoomsResponse;
import com.btt.continew.chatting.domain.ChatRoom;
import com.btt.continew.chatting.service.ChatMessageService;
import com.btt.continew.chatting.service.ChatRoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
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

@RequiredArgsConstructor
@RestController
@Api(tags = {"채팅방"})
@RequestMapping("/api/chat")
public class ChatRoomRestController {

    private final ChatRoomService chatRoomService;

    @GetMapping("/room/list/")
    @ApiOperation(value = "채팅방 목록 조회", notes = "<b>(로그인 필요)</b> 채팅방 목록 조회 API API")
    @ResponseBody
    public ResponseEntity<ChatRoomsResponse> getRoom(
        @PageableDefault(sort = "last_message_time", direction = Direction.DESC)Pageable pageable,
        @ApiParam(hidden = true) @AuthenticationPrincipal String loginId
    ) {
        System.out.println("2-1. 겟룸");
        return ResponseEntity.ok().body(chatRoomService.showChatRoom(pageable,loginId));
    }

    @PostMapping("/room")
    @ApiOperation(value = "채팅방 생성", notes = "<b>(로그인 필요)</b> 채팅방 생성 API")
    @ResponseBody
    public ChatRoom postRoom(@RequestBody ChatRoomRequest request) {
        System.out.println("1-1. 포스트 룸");
        return chatRoomService.createChatRoom(request);
    }

    @GetMapping("/room/detail")
    @ApiOperation(value = "채팅방 조회", notes = "<b>(로그인 필요)</b> 채팅방 조회 API")
    @ApiImplicitParam(name = "room_id", value = "방 번호",example = "e1757da8-81c5-40e4-8fe0-f22d4031f6a4",required = true)
    @ResponseBody
    public ChatRoomResponse getRoomDetail(
        @RequestParam(name = "room_id") String roomId){

        System.out.println("3-1. 겟룸 디테일");
        return chatRoomService.showChatRoomDetail(roomId);
    }
}

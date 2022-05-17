package com.btt.continew.house.controller;

import com.btt.continew.house.controller.dto.response.HouseLikeResponse;
import com.btt.continew.house.controller.dto.response.HouseListResponse;
import com.btt.continew.house.service.HouseLikeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"관심매물"})
public class HouseLikeRestController {

    private final HouseLikeService houseLikeService;

    public HouseLikeRestController(HouseLikeService houseLikeService) {
        this.houseLikeService = houseLikeService;
    }

    @PostMapping("/auth/houses/likes/{house_id}")
    @ApiOperation(value = "관심 매물 등록", notes = "관심 매물 등록 api")
    @ApiResponses({
        @ApiResponse(code = 400, message = "BAD_REQUEST\n 이미 관심 등록한 매물일 때(L01)")
    })
    public ResponseEntity<Void> create(@PathVariable(value = "house_id") Long houseId,
        @ApiParam(hidden = true) @AuthenticationPrincipal String loginId) {
        houseLikeService.create(houseId, loginId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/auth/houses/likes")
    @ApiOperation(value = "관심 매물 목록", notes = "관심 매물 목록 api")
    public ResponseEntity<HouseListResponse> show(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @PageableDefault
            Pageable pageable) {
        return ResponseEntity.ok().body(houseLikeService.show(loginId, pageable));
    }

    @GetMapping("/auth/houses/likes/{house_id}")
    @ApiOperation(value = "관심 매물 확인", notes = "관심 매물 여부를 확인하는 api")
    public ResponseEntity<HouseLikeResponse> checkLiked(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId,
        @PathVariable(value = "house_id") Long houseId) {
        return ResponseEntity.ok().body(houseLikeService.checkLiked(loginId, houseId));
    }

    @DeleteMapping("/auth/houses/likes/{house_id}")
    @ApiOperation(value = "관심 매물 삭제", notes = "관심 매물 삭제 api")
    public ResponseEntity<Void> delete(@PathVariable(value = "house_id") Long houseId,
        @ApiParam(hidden = true) @AuthenticationPrincipal String loginId) {
        houseLikeService.delete(houseId, loginId);
        return ResponseEntity.noContent().build();
    }

}

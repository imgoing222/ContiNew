package com.btt.continew.house.controller;

import com.btt.continew.house.controller.dto.request.HouseListRequest;
import com.btt.continew.house.controller.dto.request.HouseSaveRequest;
import com.btt.continew.house.controller.dto.response.HouseListResponse;
import com.btt.continew.house.service.HouseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@Api(tags = {"매물"})
public class HouseRestController {

    private final HouseService houseService;

    public HouseRestController(HouseService houseService) {
        this.houseService = houseService;
    }

    @PostMapping("/houses")
    @ApiOperation(value = "매물 등록", notes = "매물 등록 api")
    @ApiImplicitParam(name = "house", value = "{\n"
        + "  \"sido_name\": \"서울\",\n"
        + "  \"gunguName\": \"동대문구\",\n"
        + "  \"dongName\": \"이문동\",\n"
        + "  \"jibunAddress\": \"서울 동대문구 이문동 294-295\",\n"
        + "  \"address_detail\": \"스카이빌\",\n"
        + "  \"latitude\": 33.448093757167825,\n"
        + "  \"longitude\": 126.55492857215698,\n"
        + "  \"floor\": 3,\n"
        + "  \"trade_type\": \"이어살기\",\n"
        + "  \"house_type\": \"원룸\",\n"
        + "  \"deposit\": 10000000,\n"
        + "  \"monthly_rent\": 500000,\n"
        + "  \"maintenance_fee\": 50000,\n"
        + "  \"maintenance_detail\": \"전기요금\",\n"
        + "  \"period\": 6,\n"
        + "  \"description\": \"교환학생 가게 되어서 6개월 살고 급하게 내놓습니다 위치 좋고 남향에다가 어쩌고저쩌고\",\n"
        + "  \"options\": [1, 2, 3]\n"
        + "}")
    public ResponseEntity<Void> create(@RequestPart(value = "house") HouseSaveRequest request,
        @RequestPart(value = "images") List<MultipartFile> images,
        @ApiParam(hidden = true) @AuthenticationPrincipal String email) {
        houseService.create(request, images, email);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/houses/list")
    @ApiOperation(value = "매물 목록", notes = "매물 목록 api")
    public ResponseEntity<HouseListResponse> show(@RequestBody HouseListRequest request, Pageable pageable) {
        return ResponseEntity.ok().body(houseService.show(request, pageable));
    }
}

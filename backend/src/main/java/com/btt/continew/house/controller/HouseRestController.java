package com.btt.continew.house.controller;

import com.btt.continew.house.controller.dto.request.HouseAroundRequest;
import com.btt.continew.house.controller.dto.request.HouseListRequest;
import com.btt.continew.house.controller.dto.request.HouseSaveRequest;
import com.btt.continew.house.controller.dto.response.HouseDetailResponse;
import com.btt.continew.house.controller.dto.response.HouseIdResponse;
import com.btt.continew.house.controller.dto.response.HouseListResponse;
import com.btt.continew.house.controller.dto.response.HouseLocationResponse;
import com.btt.continew.house.controller.dto.response.HouseSimpleResponse;
import com.btt.continew.house.service.HouseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PostMapping("/auth/houses")
    @ApiOperation(value = "매물 등록", notes = "매물 등록 api")
    @ApiResponses({
        @ApiResponse(code = 404, message = "NOT_FOUND\n옵션이 존재하지 않을 때(O01)"),
        @ApiResponse(code = 400, message = "BAD_REQUEST\n이미지 등록에 실패했을 때(Z01)")
    })
    @ApiImplicitParam(name = "house", value = "{\n"
        + "  \"sido_name\": \"서울\",\n"
        + "  \"gungu_name\": \"동대문구\",\n"
        + "  \"dong_name\": \"이문동\",\n"
        + "  \"jibun_address\": \"서울 동대문구 이문동 294-295\",\n"
        + "  \"address_detail\": \"스카이빌\",\n"
        + "  \"latitude\": 33.448093757167825,\n"
        + "  \"longitude\": 126.55492857215698,\n"
        + "  \"floor\": 3,\n"
        + "  \"sale_type\": \"이어살기\",\n"
        + "  \"house_type\": \"원룸\",\n"
        + "  \"contract_type\": \"월세\",\n"
        + "  \"deposit\": 10000000,\n"
        + "  \"monthly_rent\": 500000,\n"
        + "  \"maintenance_fee\": 50000,\n"
        + "  \"maintenance_detail\": \"전기요금\",\n"
        + "  \"period\": 6,\n"
        + "  \"description\": \"교환학생 가게 되어서 6개월 살고 급하게 내놓습니다 위치 좋고 남향에다가 어쩌고저쩌고\",\n"
        + "  \"options\": [1, 2, 3]\n"
        + "}")
    public ResponseEntity<HouseIdResponse> create(@RequestPart(value = "house") HouseSaveRequest request,
        @RequestPart(value = "images") List<MultipartFile> images,
        @ApiParam(hidden = true) @AuthenticationPrincipal String email) {
        return ResponseEntity.ok().body(houseService.create(request, images, email));
    }

    @PostMapping("/houses/list")
    @ApiOperation(value = "매물 목록 (pagination 포함)", notes = "매물 목록 api (page는 쿼리스트링으로 요청)")
    public ResponseEntity<HouseListResponse> showHouses(@RequestBody HouseListRequest request,
        @PageableDefault Pageable pageable) {
        return ResponseEntity.ok().body(houseService.showHouses(request, pageable));
    }

    @PostMapping("/houses/all-list")
    @ApiOperation(value = "매물 목록 (좌표 내 전체 목록)", notes = "매물 목록 api")
    public ResponseEntity<List<HouseLocationResponse>> showAllHouses(@RequestBody HouseListRequest request) {
        return ResponseEntity.ok().body(houseService.showAllHouses(request));
    }

    @GetMapping("/houses/{house_id}")
    @ApiOperation(value = "매물 상세 조회", notes = "매물 상세 조회 api")
    @ApiImplicitParam(name = "house_id", value = "매물 id", required = true)
    public ResponseEntity<HouseDetailResponse> show(@PathVariable(value = "house_id") Long houseId) {
        return ResponseEntity.ok().body(houseService.show(houseId));
    }

    @GetMapping("/auth/houses/{house_id}/imgs")
    @ApiOperation(value = "매물 수정 조회", notes = "매물 수정 시 정보를 조회 api")
    @ApiImplicitParam(name = "house_id", value = "매물 id", required = true)
    public ResponseEntity<MultiValueMap<String, Object>> showForUpdate(@PathVariable(value = "house_id") Long houseId) {
        return ResponseEntity.ok().body(houseService.showForUpdateMultipartFile(houseId));
    }

//    @GetMapping("/auth/houses/{house_id}/mpf")
//    @ApiOperation(value = "매물 수정 조회", notes = "매물 수정 시 정보를 조회 api")
//    @ApiImplicitParam(name = "house_id", value = "매물 id", required = true)
//    public ResponseEntity<HouseUpdateResponse> showForUpdateMultipartFile(@PathVariable(value = "house_id") Long houseId) {
//        return ResponseEntity.ok().body(houseService.showForUpdateMultipartFile(houseId));
//    }

    @PostMapping("/houses/around")
    @ApiOperation(value = "주변 매물 조회", notes = "주변 매물 조회 api")
    public ResponseEntity<HouseListResponse> showAroundHouses(@RequestBody HouseAroundRequest request,
        @PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(houseService.showAroundHouses(request, pageable));
    }

    @GetMapping("/auth/houses/mine")
    @ApiOperation(value = "내 매물 조회", notes = "내 매물을 조회하는 api")
    public ResponseEntity<List<HouseSimpleResponse>> showMyHouses(@ApiParam(hidden = true) @AuthenticationPrincipal String loginId) {
        return ResponseEntity.ok().body(houseService.showMyHouses(loginId));
    }

    @PutMapping("/auth/houses/{house_id}")
    @ApiOperation(value = "매물 수정", notes = "매물 수정 api")
    @ApiImplicitParam(name = "house_id", value = "매물 id", required = true)
    public ResponseEntity<Void> update(@PathVariable(value = "house_id") Long houseId,
        @RequestPart(value = "house") HouseSaveRequest request, @RequestPart(value = "images") List<MultipartFile> images,
        @ApiParam(hidden = true) @AuthenticationPrincipal String loginId) {
        houseService.update(houseId, request, images, loginId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/auth/houses/{house_id}")
    @ApiOperation(value = "매물 삭제", notes = "매물 삭제 api")
    @ApiImplicitParam(name = "house_id", value = "매물 id", readOnly = true)
    public ResponseEntity<Void> delete(@PathVariable(value = "house_id") Long houseId,
        @ApiParam(hidden = true) @AuthenticationPrincipal String loginId) {
        houseService.delete(houseId, loginId);
        return ResponseEntity.noContent().build();
    }
}

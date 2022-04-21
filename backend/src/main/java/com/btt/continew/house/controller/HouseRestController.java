package com.btt.continew.house.controller;

import com.btt.continew.house.controller.dto.request.HouseSaveRequest;
import com.btt.continew.house.service.HouseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public ResponseEntity<Void> create(@RequestPart(value = "house") HouseSaveRequest request,
        @RequestPart(value = "images") List<MultipartFile> images,
        @ApiParam(hidden = true) @AuthenticationPrincipal String email) {
        houseService.create(request, images, email);
        return ResponseEntity.noContent().build();
    }
}

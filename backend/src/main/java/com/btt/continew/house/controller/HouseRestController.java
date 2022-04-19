package com.btt.continew.house.controller;

import com.btt.continew.house.controller.dto.request.HouseSaveRequest;
import com.btt.continew.house.service.HouseService;
import io.swagger.annotations.Api;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Api(tags = {"매물"})
public class HouseRestController {

    private final HouseService houseService;

    public HouseRestController(HouseService houseService) {
        this.houseService = houseService;
    }

    @PostMapping("/house")
    public ResponseEntity<Void> create(@RequestBody HouseSaveRequest request, @AuthenticationPrincipal String email) {
        houseService.create(request, email);
        return ResponseEntity.noContent().build();
    }
}

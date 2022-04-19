package com.btt.continew.house.controller;

import com.btt.continew.house.service.HouseService;
import io.swagger.annotations.Api;
import org.springframework.http.ResponseEntity;
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
}

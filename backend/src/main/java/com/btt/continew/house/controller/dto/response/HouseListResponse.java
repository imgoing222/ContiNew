package com.btt.continew.house.controller.dto.response;

import com.btt.continew.house.domain.House;
import com.btt.continew.house.domain.HouseLike;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.data.domain.Page;

@Getter
public class HouseListResponse {

    @JsonProperty("houses")
    @ApiModelProperty(notes = "매물 목록")
    private List<HouseSimpleResponse> houseSimpleResponses;

    @JsonProperty("total_page_count")
    @ApiModelProperty(position = 1, notes = "전체 페이지", example = "2")
    private int totalPageCount;

    @JsonProperty("current_page_count")
    @ApiModelProperty(position = 2, notes = "현재 페이지", example = "0")
    private int currentPageCount;

    public HouseListResponse() {
    }

    public HouseListResponse(List<HouseSimpleResponse> houseSimpleResponses, int totalPageCount, int currentPageCount) {
        this.houseSimpleResponses = houseSimpleResponses;
        this.totalPageCount = totalPageCount;
        this.currentPageCount = currentPageCount;
    }

    public static HouseListResponse from(Page<HouseSimpleResponse> houses) {
        return new HouseListResponse(
            houses.toList(),
            houses.getTotalPages(),
            houses.getNumber()
        );
    }

    public static HouseListResponse fromHouseLikes(Page<HouseLike> houseLikes) {
        return new HouseListResponse(
            houseLikes.stream()
                .map(h -> HouseSimpleResponse.from(h.getHouse()))
                .collect(Collectors.toList()),
            houseLikes.getTotalPages(),
            houseLikes.getNumber()
        );
    }

    public static HouseListResponse fromHouses(Page<House> houses) {
        return new HouseListResponse(
            houses.stream()
                .map(h -> HouseSimpleResponse.from(h))
                .collect(Collectors.toList()),
            houses.getTotalPages(),
            houses.getNumber());
    }
}

package com.btt.continew.house.controller.dto.response;

import com.btt.continew.house.domain.House;
import com.btt.continew.house.domain.HouseOption;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;

@Getter
public class HouseDetailResponse {

    @JsonProperty("house_id")
    @ApiModelProperty(notes = "매물 id", example = "1")
    private Long id;

    @JsonProperty("username")
    @ApiModelProperty(notes = "작성자 유저네임", example = "채채퐁")
    private String username;

    @JsonProperty("phone_auth")
    @ApiModelProperty(notes = "작성자 휴대폰 인증 여부", example = "true")
    private Boolean phoneAuth;

    @JsonProperty("jibun_address")
    @ApiModelProperty(notes = "지번 주소", example = "서울 동대문구 이문동 294-295")
    private String jibunAddress;

    @JsonProperty("address_detail")
    @ApiModelProperty(notes = "상세 주소", example = "스카이빌")
    private String addressDetail;

    @JsonProperty("trade_type")
    @ApiModelProperty(notes = "거래유형", example = "이어살기")
    private String tradeType;

    @JsonProperty("house_type")
    @ApiModelProperty(notes = "매물유형", example = "원룸")
    private String houseType;

    @JsonProperty("deposit")
    @ApiModelProperty(notes = "보증금", example = "10000000")
    private Long deposit;

    @JsonProperty("monthly_rent")
    @ApiModelProperty(notes = "월세", example = "500000")
    private Long monthlyRent;

    @JsonProperty("maintenance_fee")
    @ApiModelProperty(notes = "관리비", example = "50000")
    private Long maintenanceFee;

    @JsonProperty("maintenance_detail")
    @ApiModelProperty(notes = "관리비 상세", example = "전기요금")
    private String maintenanceDetail;

    @JsonProperty("period")
    @ApiModelProperty(notes = "입주기간", example = "6")
    private Integer period;

    @JsonProperty("description")
    @ApiModelProperty(notes = "상세 설명", example = "6개월 짜리 방 내놓습니다")
    private String description;

    @JsonProperty("options")
    @ApiModelProperty(notes = "옵션", example = "[1,2,3]")
    private List<Long> options;

    public HouseDetailResponse() {
    }

    public HouseDetailResponse(Long id, String username, Boolean phoneAuth, String jibunAddress, String addressDetail,
        String tradeType, String houseType, Long deposit, Long monthlyRent, Long maintenanceFee, String maintenanceDetail,
        Integer period, String description, List<Long> options) {
        this.id = id;
        this.username = username;
        this.phoneAuth = phoneAuth;
        this.jibunAddress = jibunAddress;
        this.addressDetail = addressDetail;
        this.tradeType = tradeType;
        this.houseType = houseType;
        this.deposit = deposit;
        this.monthlyRent = monthlyRent;
        this.maintenanceFee = maintenanceFee;
        this.maintenanceDetail = maintenanceDetail;
        this.period = period;
        this.description = description;
        this.options = options;
    }

    public static HouseDetailResponse of(House house, List<HouseOption> houseOptions) {
        return new HouseDetailResponse(
            house.getId(),
            house.getMember().getUsername(),
            house.getMember().getPhoneAuth(),
            house.getJibunAddress(),
            house.getAddressDetail(),
            house.getTradeType(),
            house.getHouseType(),
            house.getDeposit(),
            house.getMonthlyRent(),
            house.getMaintenanceFee(),
            house.getMaintenanceDetail(),
            house.getPeriod(),
            house.getDescription(),
            houseOptions.stream()
                .map(h -> h.getId())
                .collect(Collectors.toList())
        );
    }
}

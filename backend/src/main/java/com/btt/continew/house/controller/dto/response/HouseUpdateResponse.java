package com.btt.continew.house.controller.dto.response;

import com.btt.continew.house.domain.House;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class HouseUpdateResponse {
    @JsonProperty("house_id")
    @ApiModelProperty(position = 0, notes = "매물 id", example = "1")
    private Long id;

    @JsonProperty("login_id")
    @ApiModelProperty(position = 1, notes = "작성자 로그인 id", example = "loling3")
    private String loginId;

    @JsonProperty("username")
    @ApiModelProperty(position = 2, notes = "작성자 유저네임", example = "채채퐁")
    private String username;

    @JsonProperty("phone_auth")
    @ApiModelProperty(position = 3, notes = "작성자 휴대폰 인증 여부", example = "true")
    private Boolean phoneAuth;

    @JsonProperty("sido_name")
    @ApiModelProperty(position = 4, notes = "시/도명", example = "서울")
    private String sidoName;

    @JsonProperty("gungu_name")
    @ApiModelProperty(position = 5, notes = "군/구명", example = "동대문구")
    private String gunguName;

    @JsonProperty("dong_name")
    @ApiModelProperty(position = 6, notes = "동명", example = "이문동")
    private String dongName;

    @JsonProperty("jibun_address")
    @ApiModelProperty(position = 7, notes = "지번 주소", example = "서울 동대문구 이문동 294-295")
    private String jibunAddress;

    @JsonProperty("address_detail")
    @ApiModelProperty(position = 8, notes = "상세 주소", example = "스카이빌")
    private String addressDetail;

    @JsonProperty("latitude")
    @ApiModelProperty(position = 9, notes = "위도", example = "33.448093757167825")
    private Double latitude;

    @JsonProperty("longitude")
    @ApiModelProperty(position = 10, notes = "경도", example = "126.55492857215698")
    private Double longitude;

    @JsonProperty("floor")
    @ApiModelProperty(position = 11, notes = "층", example = "3")
    private Integer floor;

    @JsonProperty("sale_type")
    @ApiModelProperty(position = 12, notes = "거래유형", example = "이어살기")
    private String saleType;

    @JsonProperty("house_type")
    @ApiModelProperty(position = 13, notes = "매물유형", example = "원룸")
    private String houseType;

    @JsonProperty("contract_type")
    @ApiModelProperty(position = 14, name = "전/월세", example = "월세")
    private String contractType;

    @JsonProperty("deposit")
    @ApiModelProperty(position = 15, notes = "보증금", example = "10000000")
    private Long deposit;

    @JsonProperty("monthly_rent")
    @ApiModelProperty(position = 16, notes = "월세", example = "500000")
    private Long monthlyRent;

    @JsonProperty("maintenance_fee")
    @ApiModelProperty(position = 17, notes = "관리비", example = "50000")
    private Long maintenanceFee;

    @JsonProperty("maintenance_detail")
    @ApiModelProperty(position = 18, notes = "관리비 상세", example = "전기요금")
    private String maintenanceDetail;

    @JsonProperty("period")
    @ApiModelProperty(position = 19, notes = "입주기간", example = "6")
    private Integer period;

    @JsonProperty("description")
    @ApiModelProperty(position = 20, notes = "상세 설명", example = "6개월 짜리 방 내놓습니다")
    private String description;

    @JsonProperty("options")
    @ApiModelProperty(position = 21, notes = "옵션", example = "[1, 2, 3]")
    private List<Long> options;

    @JsonProperty("images")
    @ApiModelProperty(position = 22, notes = "이미지", example = "")
    private List<MultipartFile> images;

    public HouseUpdateResponse() {
    }

    public HouseUpdateResponse(Long id, String loginId, String username, Boolean phoneAuth, String sidoName,
        String gunguName, String dongName, String jibunAddress, String addressDetail, Double latitude, Double longitude,
        Integer floor, String saleType, String houseType, String contractType, Long deposit, Long monthlyRent,
        Long maintenanceFee, String maintenanceDetail, Integer period, String description, List<Long> options,
        List<MultipartFile> images) {
        this.id = id;
        this.loginId = loginId;
        this.username = username;
        this.phoneAuth = phoneAuth;
        this.sidoName = sidoName;
        this.gunguName = gunguName;
        this.dongName = dongName;
        this.jibunAddress = jibunAddress;
        this.addressDetail = addressDetail;
        this.latitude = latitude;
        this.longitude = longitude;
        this.floor = floor;
        this.saleType = saleType;
        this.houseType = houseType;
        this.contractType = contractType;
        this.deposit = deposit;
        this.monthlyRent = monthlyRent;
        this.maintenanceFee = maintenanceFee;
        this.maintenanceDetail = maintenanceDetail;
        this.period = period;
        this.description = description;
        this.options = options;
        this.images = images;
    }

    public static HouseUpdateResponse of(House house, List<MultipartFile> images){
        return new HouseUpdateResponse(
            house.getId(),
            house.getMember().getLoginId(),
            house.getMember().getUsername(),
            house.getMember().getPhoneAuth(),
            house.getSidoName(),
            house.getGunguName(),
            house.getDongName(),
            house.getJibunAddress(),
            house.getAddressDetail(),
            house.getLatitude(),
            house.getLongitude(),
            house.getFloor(),
            house.getSaleType(),
            house.getHouseType(),
            house.getContractType(),
            house.getDeposit(),
            house.getMonthlyRent(),
            house.getMaintenanceFee(),
            house.getMaintenanceDetail(),
            house.getPeriod(),
            house.getDescription(),
            Arrays.stream(house.getOptions().split(", "))
                .map(Long::parseLong).collect(Collectors.toList()),
            images
        );
    }
}

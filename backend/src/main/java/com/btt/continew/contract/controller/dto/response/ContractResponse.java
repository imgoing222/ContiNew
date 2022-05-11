package com.btt.continew.contract.controller.dto.response;

import com.btt.continew.contract.domain.Contract;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import java.time.LocalDate;

public class ContractResponse {

    @JsonProperty("location")
    @ApiModelProperty(position = 1, notes = "소재지 (지번 주소 사용)", example = "서울특별시 강남구 압구정동 369-1")
    private String location;

    @JsonProperty("area")
    @ApiModelProperty(position = 2, notes = "면적 (제곱미터 사용)", example = "160")
    private String area;

    @JsonProperty("net_leasable_area")
    @ApiModelProperty(position = 3, notes = "전용면적 (제곱미터 사용)", example = "84")
    private String netLeasableArea;

    @JsonProperty("contract_type")
    @ApiModelProperty(position = 4, notes = "전월세 타입 (\"전세\" / \"월세\")", example = "월세")
    private String contractType;

    @JsonProperty("tenancy_deposit")
    @ApiModelProperty(position = 5, notes = "임차보증금", example = "5,000,000원")
    private String tenancyDeposit;

    @JsonProperty("maintenance_fee")
    @ApiModelProperty(position = 6, notes = "관리비", example = "15,000원")
    private String maintenanceFee;

    @JsonProperty("contract_start")
    @ApiModelProperty(position = 7, notes = "계약기간 시작", example = "2022-02-02")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate contractStart;

    @JsonProperty("contract_end")
    @ApiModelProperty(position = 8, notes = "계약기간 종료", example = "2022-06-02")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate contractEnd;

    @JsonProperty("total_premium")
    @ApiModelProperty(position = 9, notes = "총 권리금", example = "3,000원")
    private String totalPremium;

    @JsonProperty("down_payment")
    @ApiModelProperty(position = 10, notes = "계약금", example = "2,100원")
    private String downPayment;

    @JsonProperty("middle_payment")
    @ApiModelProperty(position = 11, notes = "중도금", example = "1,100원")
    private String middlePayment;

    @JsonProperty("middle_date")
    @ApiModelProperty(position = 12, notes = "중도금 기간", example = "2022-01-31")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate middleDate;

    @JsonProperty("balance_payment")
    @ApiModelProperty(position = 13, notes = "잔금", example = "1,000원")
    private String balancePayment;

    @JsonProperty("balance_date")
    @ApiModelProperty(position = 14, notes = "잔금 기간", example = "2022-02-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate balanceDate;

    @JsonProperty("seller_address")
    @ApiModelProperty(position = 15, notes = "임차인 주소", example = "대구광역시 북구 부끄로 11, 101동 123호")
    private String sellerAddress;

    @JsonProperty("seller_name")
    @ApiModelProperty(position = 16, notes = "임차인 성명", example = "이사간")
    private String sellerName;

    @JsonProperty("seller_birth")
    @ApiModelProperty(position = 17, notes = "임차인 생년월일", example = "1993-01-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate sellerBirth;

    @JsonProperty("seller_phone")
    @ApiModelProperty(position = 18, notes = "임차인 전화", example = "01000000000")
    private String sellerPhone;

    @JsonProperty("seller_signature")
    @ApiModelProperty(position = 19, notes = "임차인 사인", example = "이미지 url")
    private String sellerSignature;

    @JsonProperty("buyer_address")
    @ApiModelProperty(position = 20, notes = "신규임차인주소", example = "대구광역시 중구 가시키드나로 123, 102동 101호")
    private String buyerAddress;

    @JsonProperty("buyer_name")
    @ApiModelProperty(position = 21, notes = "신규임차인 성명", example = "이사온")
    private String buyerName;

    @JsonProperty("buyer_birth")
    @ApiModelProperty(position = 22, notes = "신규임차인 생년월일", example = "1995-01-01")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate buyerBirth;

    @JsonProperty("buyer_phone")
    @ApiModelProperty(position = 23, notes = "신규임차인 전화", example = "01000000001")
    private String buyerPhone;

    @JsonProperty("buyer_signature")
    @ApiModelProperty(position = 24, notes = "신규임차인 사인", example = "이미지 url")
    private String buyerSignature;

    @JsonProperty("current_level")
    @ApiModelProperty(position = 25, notes = "현재 단계", example = "1")
    private Integer currentLevel;

    public ContractResponse() {
    }

    public ContractResponse(String location, String area, String netLeasableArea, String contractType,
        String tenancyDeposit, String maintenanceFee, LocalDate contractStart, LocalDate contractEnd, String totalPremium,
        String downPayment, String middlePayment, LocalDate middleDate, String balancePayment, LocalDate balanceDate,
        String sellerAddress, String sellerName, LocalDate sellerBirth, String sellerPhone, String sellerSignature,
        String buyerAddress, String buyerName, LocalDate buyerBirth, String buyerPhone, String buyerSignature,
        Integer currentLevel) {
        this.location = location;
        this.area = area;
        this.netLeasableArea = netLeasableArea;
        this.contractType = contractType;
        this.tenancyDeposit = tenancyDeposit;
        this.maintenanceFee = maintenanceFee;
        this.contractStart = contractStart;
        this.contractEnd = contractEnd;
        this.totalPremium = totalPremium;
        this.downPayment = downPayment;
        this.middlePayment = middlePayment;
        this.middleDate = middleDate;
        this.balancePayment = balancePayment;
        this.balanceDate = balanceDate;
        this.sellerAddress = sellerAddress;
        this.sellerName = sellerName;
        this.sellerBirth = sellerBirth;
        this.sellerPhone = sellerPhone;
        this.sellerSignature = sellerSignature;
        this.buyerAddress = buyerAddress;
        this.buyerName = buyerName;
        this.buyerBirth = buyerBirth;
        this.buyerPhone = buyerPhone;
        this.buyerSignature = buyerSignature;
        this.currentLevel = currentLevel;
    }

    public static ContractResponse of(Contract contract) {
        return new ContractResponse(
            contract.getLocation(),
            contract.getArea(),
            contract.getNetLeasableArea(),
            contract.getContractType(),
            contract.getTenancyDeposit(),
            contract.getMaintenanceFee(),
            contract.getContractStart(),
            contract.getContractEnd(),
            contract.getTotalPremium(),
            contract.getDownPayment(),
            contract.getMiddlePayment(),
            contract.getMiddleDate(),
            contract.getBalancePayment(),
            contract.getBalanceDate(),
            contract.getSellerAddress(),
            contract.getSellerName(),
            contract.getSellerBirth(),
            contract.getSellerPhone(),
            contract.getSellerSignature(),
            contract.getBuyerAddress(),
            contract.getBuyerName(),
            contract.getBuyerBirth(),
            contract.getBuyerPhone(),
            contract.getBuyerSignature(),
            contract.getLevel());
    }
}

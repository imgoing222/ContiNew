package com.btt.continew.contract.domain;

import com.btt.continew.contract.controller.dto.request.ContractRequest;
import com.btt.continew.global.domain.BaseEntity;
import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.btt.continew.house.domain.House;
import com.btt.continew.member.domain.Member;
import java.time.LocalDate;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.Where;

@Getter
@Entity
@Where(clause = "deleted_at is null")
public class Contract extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_id")
    private Long id;

    @ManyToOne(targetEntity = House.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "house_id", nullable = false)
    private House house;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private Member seller;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", nullable = false)
    private Member buyer;

    @Column(name = "level")
    private Integer level;

    @Column(name = "location")
    private String location;

    @Column(name = "area")
    private String area;

    @Column(name = "net_leasable_area")
    private String netLeasableArea;

    @Column(name = "contract_type")
    private String contractType;

    @Column(name = "tenancy_deposit")
    private String tenancyDeposit;

    @Column(name = "maintenance_fee")
    private String maintenanceFee;

    @Column(name = "contract_start")
    private LocalDate contractStart;

    @Column(name = "contract_end")
    private LocalDate contractEnd;

    @Column(name = "total_premium")
    private String totalPremium;

    @Column(name = "down_payment")
    private String downPayment;

    @Column(name = "middle_payment")
    private String middlePayment;

    @Column(name = "middle_date")
    private LocalDate middleDate;

    @Column(name = "balance_payment")
    private String balancePayment;

    @Column(name = "balance_date")
    private LocalDate balanceDate;

    @Column(name = "seller_address")
    private String sellerAddress;

    @Column(name = "seller_name")
    private String sellerName;

    @Column(name = "seller_birth")
    private LocalDate sellerBirth;

    @Column(name = "seller_phone", length = 16)
    private String sellerPhone;

    @Column(name = "seller_signature")
    private String sellerSignature;

    @Column(name = "buyer_address")
    private String buyerAddress;

    @Column(name = "buyer_name")
    private String buyerName;

    @Column(name = "buyer_birth")
    private LocalDate buyerBirth;

    @Column(name = "buyer_phone", length = 16)
    private String buyerPhone;

    @Column(name = "buyer_signature")
    private String buyerSignature;

    public Contract() {
    }

    @Builder
    public Contract(House house, Member seller, Member buyer) {
        this.house = house;
        this.seller = seller;
        this.buyer = buyer;
        this.level = 1;
    }

    public void levelOneWrite(ContractRequest request) {
        isNull(request.getLocation());
        this.location = request.getLocation();
        isNull(request.getArea());
        this.area = request.getArea();
        isNull(request.getNetLeasableArea());
        this.netLeasableArea = request.getNetLeasableArea();
        isNull(request.getContractType());
        this.contractType = request.getContractType();
        isNull(request.getTenancyDeposit());
        this.tenancyDeposit = request.getTenancyDeposit();
        isNull(request.getMaintenanceFee());
        this.maintenanceFee = request.getMaintenanceFee();
        isNull(request.getContractStart());
        this.contractStart = request.getContractStart();
        isNull(request.getContractEnd());
        this.contractEnd = request.getContractEnd();
        isNull(request.getTotalPremium());
        this.totalPremium = request.getTotalPremium();
        isNull(request.getDownPayment());
        this.downPayment = request.getDownPayment();
        isNull(request.getMiddlePayment());
        this.middlePayment = request.getMiddlePayment();
        isNull(request.getMiddleDate());
        this.middleDate = request.getMiddleDate();
        isNull(request.getBalancePayment());
        this.balancePayment = request.getBalancePayment();
        isNull(request.getBalanceDate());
        this.balanceDate = request.getBalanceDate();
        isNull(request.getSellerAddress());
        this.sellerAddress = request.getSellerAddress();
        isNull(request.getSellerName());
        this.sellerName = request.getSellerName();
        isNull(request.getSellerBirth());
        this.sellerBirth = request.getSellerBirth();
        isNull(request.getSellerPhone());
        this.sellerPhone = request.getSellerPhone();
        isNull(request.getNextLevel());
        if (request.getNextLevel()) {
            this.level = 2;
        }
    }

    public void levelTwoWrite(ContractRequest request) {
        isNull(request.getBuyerAddress());
        this.buyerAddress = request.getBuyerAddress();
        isNull(request.getBuyerName());
        this.buyerName = request.getBuyerName();
        isNull(request.getBuyerBirth());
        this.buyerBirth = request.getBuyerBirth();
        isNull(request.getBuyerPhone());
        this.buyerPhone = request.getBuyerPhone();
        isNull(request.getBuyerSignature());
        this.buyerSignature = request.getBuyerSignature();
        isNull(request.getNextLevel());
        if (request.getNextLevel()) {
            this.level = 3;
        }
    }

    public void levelThreeWrite(ContractRequest request) {
        isNull(request.getSellerSignature());
        this.sellerSignature = request.getSellerSignature();
        isNull(request.getNextLevel());
        if (request.getNextLevel()) {
            this.level = 4;
        }
    }

    private void isNull(Object object){
        if(Objects.isNull(object)){
            throw new BusinessException(ErrorCode.CONTRACT_NULL_DATA);
        }
    }
}

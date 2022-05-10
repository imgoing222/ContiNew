package com.btt.continew.contract.domain;

import com.btt.continew.global.domain.BaseEntity;
import com.btt.continew.house.domain.House;
import com.btt.continew.member.domain.Member;
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

@Entity
@Getter
@Where(clause = "deleted_at is null")
public class ContractAgree extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_agree_id")
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

    @Column(name = "seller_agree")
    private Boolean sellerAgree;

    @Column(name = "buyer_agree")
    private Boolean buyerAgree;

    public ContractAgree() {
    }

    @Builder
    public ContractAgree(House house, Member seller, Member buyer) {
        this.house = house;
        this.seller = seller;
        this.buyer = buyer;
        this.sellerAgree = false;
        this.buyerAgree = false;
    }

    public void sellerAgree() {
        this.sellerAgree = true;
    }

    public void buyerAgree() {
        this.buyerAgree = true;
    }
}

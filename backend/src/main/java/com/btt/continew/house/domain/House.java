package com.btt.continew.house.domain;

import com.btt.continew.global.domain.BaseEntity;
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

@Entity
@Getter
public class House extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "house_id")
    private Long id;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "sido_name")
    private String sidoName;

    @Column(name = "gungu_name")
    private String gunguName;

    @Column(name = "dong_name")
    private String dongName;

    @Column(name = "road_name")
    private String roadName;

    @Column(name = "trade_type")
    private String tradeType;

    @Column(name = "house_type")
    private String houseType;

    @Column(name = "deposit")
    private Long deposit;

    @Column(name = "monthly_rent")
    private Long monthlyRent;

    @Column(name = "maintenance_fee")
    private Long maintenanceFee;

    @Column(name = "maintenance_detail")
    private String maintenanceDetail;

    @Column(name = "period")
    private String period;

    public House() {

    }

    @Builder
    public House(Long id, Member member, String sidoName, String gunguName, String dongName, String roadName,
        String tradeType, String houseType, Long deposit, Long monthlyRent, Long maintenanceFee, String maintenanceDetail,
        String period) {
        this.id = id;
        this.member = member;
        this.sidoName = sidoName;
        this.gunguName = gunguName;
        this.dongName = dongName;
        this.roadName = roadName;
        this.tradeType = tradeType;
        this.houseType = houseType;
        this.deposit = deposit;
        this.monthlyRent = monthlyRent;
        this.maintenanceFee = maintenanceFee;
        this.maintenanceDetail = maintenanceDetail;
        this.period = period;
    }
}

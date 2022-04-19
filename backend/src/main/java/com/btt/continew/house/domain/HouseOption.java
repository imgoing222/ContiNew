package com.btt.continew.house.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;

@Entity
@Getter
public class HouseOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "house_option_id")
    private Long id;

    @ManyToOne(targetEntity = House.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "house_id")
    private House house;

    @ManyToOne(targetEntity = Option.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "option_id")
    private Option option;

    public HouseOption() {
    }

    public HouseOption(House house, Option option) {
        this.house = house;
        this.option = option;
    }
}
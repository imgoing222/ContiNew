package com.btt.continew.house.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "option_id")
    private Long id;

    @Column(name = "name")
    private String name;

    public Option() {
    }

    public Option(String name) {
        this.name = name;
    }
}

package com.btt.continew.house.domain;

import com.btt.continew.global.domain.BaseEntity;
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
public class Image extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @ManyToOne(targetEntity = House.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "house_id")
    private House house;

    @Column(name = "url")
    private String url;

    public Image() {
    }

    @Builder
    public Image(House house, String url) {
        this.house = house;
        this.url = url;
    }
}

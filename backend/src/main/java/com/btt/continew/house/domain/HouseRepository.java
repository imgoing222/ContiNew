package com.btt.continew.house.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseRepository extends JpaRepository<House, Long> {
    Page<House> findAllByLatitudeBetweenAndLongitudeBetween(Long latStart, Long latEnd, Long lngStart, Long lngEnd, Pageable pageable);
}
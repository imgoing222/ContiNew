package com.btt.continew.house.domain;

import com.btt.continew.member.domain.Member;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseRepository extends JpaRepository<House, Long> {

    Page<House> findAllByLatitudeBetweenAndLongitudeBetween(Long latStart, Long latEnd, Long lngStart, Long lngEnd,
        Pageable pageable);

    boolean existsByMemberAndExpiredAtAfter(Member member, LocalDateTime now);

    Page<House> findAllBySidoNameAndGunguNameAndDongName(String sidoName, String gunguName, String dongName, Pageable pageable);
}
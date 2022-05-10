package com.btt.continew.house.domain;

import com.btt.continew.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseLikeRepository extends JpaRepository<HouseLike, Long> {

    boolean existsByHouseAndMember(House house, Member member);
}

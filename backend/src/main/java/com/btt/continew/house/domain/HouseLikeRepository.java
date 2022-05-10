package com.btt.continew.house.domain;

import com.btt.continew.member.domain.Member;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseLikeRepository extends JpaRepository<HouseLike, Long> {

    boolean existsByHouseAndMember(House house, Member member);

    Optional<HouseLike> findByHouseAndMember(House house, Member member);

    Page<HouseLike> findAllByMember(Member member, Pageable pageable);
}

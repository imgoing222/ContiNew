package com.btt.continew.contract.domain;

import com.btt.continew.house.domain.House;
import com.btt.continew.member.domain.Member;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContractAgreeRepository extends JpaRepository<ContractAgree, Long> {

    Optional<ContractAgree> findByHouseAndSellerAndBuyer(House house, Member seller, Member buyer);

    @Modifying
    @Query(value = "update ContractAgree ca "
        + "set ca.deletedAt = :now "
        + "where ca.house = :house_id")
    Integer updateDeletedAtByHouse(@Param("house_id") House house, @Param("now") LocalDateTime now);
}

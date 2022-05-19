package com.btt.continew.contract.domain;

import com.btt.continew.house.domain.House;
import com.btt.continew.member.domain.Member;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ContractRepository extends JpaRepository<Contract, Long> {

    Optional<Contract> findByHouseAndSellerAndBuyer(House house, Member seller, Member buyer);

    List<Contract> findAllBySellerOrBuyer(Member seller, Member buyer);

    @Modifying
    @Query(value = "update Contract c "
        + "set c.deletedAt = :now "
        + "where c.house = :house_id")
    Integer updateDeletedAtByHouse(@Param("house_id") House house, @Param("now") LocalDateTime now);
}

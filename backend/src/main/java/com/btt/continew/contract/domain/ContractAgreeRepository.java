package com.btt.continew.contract.domain;

import com.btt.continew.house.domain.House;
import com.btt.continew.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractAgreeRepository extends JpaRepository<ContractAgree, Long> {

    Optional<ContractAgree> findByHouseAndSellerAndBuyer(House house, Member seller, Member buyer);
}

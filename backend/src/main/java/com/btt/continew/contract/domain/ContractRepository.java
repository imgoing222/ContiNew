package com.btt.continew.contract.domain;

import com.btt.continew.house.domain.House;
import com.btt.continew.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepository extends JpaRepository<Contract, Long> {

    Optional<Contract> findByHouseAndSellerAndBuyer(House house, Member seller, Member buyer);
}

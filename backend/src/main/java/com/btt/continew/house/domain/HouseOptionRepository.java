package com.btt.continew.house.domain;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseOptionRepository extends JpaRepository<HouseOption, Long> {

    List<HouseOption> findAllByHouse(House house);
}

package com.btt.continew.house.domain;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HouseOptionRepository extends JpaRepository<HouseOption, Long> {

    List<HouseOption> findAllByHouse(House house);

    @Modifying
    @Query(nativeQuery = true, value = "update houseoption ho set ho.deleted_at = current_timestamp where ho.house_id = (:id) and ho.deleted_at is null")
    int deleteHouseOptionsByHouse(@Param("id") Long id);
}

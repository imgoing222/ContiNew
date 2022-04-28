package com.btt.continew.house.domain;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findAllByHouse(House house);

    @Modifying
    @Query(nativeQuery = true, value = "update image i set i.deleted_at = current_timestamp where i.house_id = (:id) and i.deleted_at is null")
    int deleteImagesByHouses(@Param("id") Long id);

}

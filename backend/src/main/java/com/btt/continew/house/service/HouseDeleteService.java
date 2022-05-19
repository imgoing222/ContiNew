package com.btt.continew.house.service;

import com.btt.continew.contract.service.ContractService;
import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.btt.continew.house.domain.House;
import com.btt.continew.house.domain.HouseRepository;
import com.btt.continew.house.domain.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HouseDeleteService {

    private final HouseRepository houseRepository;
    private final ContractService contractService;
    private final ImageRepository imageRepository;

    public HouseDeleteService(HouseRepository houseRepository, ContractService contractService,
        ImageRepository imageRepository) {
        this.houseRepository = houseRepository;
        this.contractService = contractService;
        this.imageRepository = imageRepository;
    }

    @Transactional
    public void delete(Long houseId, String loginId) {
        House house = houseRepository.findById(houseId)
            .orElseThrow(() -> new BusinessException(ErrorCode.HOUSE_NOT_FOUND_BY_ID));

        house.checkHouseByLoginId(loginId);

//        houseOptionRepository.deleteHouseOptionsByHouse(houseId);
        imageRepository.deleteImagesByHouses(houseId);

        contractService.contractAgreeDeleteByHouse(house);
        contractService.contractDeleteByHouse(house);

        house.saveDeletedTime();
    }
}

package com.btt.continew.house.service;

import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.btt.continew.house.controller.dto.request.HouseSaveRequest;
import com.btt.continew.house.domain.House;
import com.btt.continew.house.domain.HouseOption;
import com.btt.continew.house.domain.HouseOptionRepository;
import com.btt.continew.house.domain.HouseRepository;
import com.btt.continew.house.domain.Option;
import com.btt.continew.house.domain.OptionRepository;
import com.btt.continew.member.domain.Member;
import com.btt.continew.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HouseService {

    private final HouseRepository houseRepository;
    private final OptionRepository optionRepository;
    private final HouseOptionRepository houseOptionRepository;
    private final MemberService memberService;

    public HouseService(HouseRepository houseRepository, OptionRepository optionRepository,
        HouseOptionRepository houseOptionRepository, MemberService memberService) {
        this.houseRepository = houseRepository;
        this.optionRepository = optionRepository;
        this.houseOptionRepository = houseOptionRepository;
        this.memberService = memberService;
    }

    @Transactional
    public void create(HouseSaveRequest request, String email) {
        Member member = memberService.findByEmail(email);
        House house = House.builder()
            .member(member)
            .deposit(request.getDeposit())
            .monthlyRent(request.getMontylyRent())
            .maintenanceFee(request.getMaintenanceFee())
            .maintenanceDetail(request.getMaintenanceDetail())
            .description(request.getDescription())
            .sidoName(request.getSidoName())
            .gunguName(request.getGunguName())
            .dongName(request.getDongName())
            .roadName(request.getRoadName())
            .addressDetail(request.getAddressDetail())
            .floor(request.getFloor())
            .houseType(request.getHouseType())
            .tradeType(request.getTradeType())
            .period(request.getPeriod())
            .build();
        houseRepository.save(house);

       if (!request.getOptions().isEmpty()){
           for(Long optionId: request.getOptions()) {
               Option option = optionRepository.findById(optionId)
                   .orElseThrow(() -> new BusinessException(ErrorCode.OPTION_NOT_FOUND_BY_ID));
               HouseOption houseOption = HouseOption.builder()
                   .house(house)
                   .option(option)
                   .build();
               houseOptionRepository.save(houseOption);
           }
       }
    }
}
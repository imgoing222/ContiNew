package com.btt.continew.house.service;

import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.btt.continew.house.controller.dto.request.HouseListRequest;
import com.btt.continew.house.controller.dto.request.HouseSaveRequest;
import com.btt.continew.house.controller.dto.response.HouseDetailResponse;
import com.btt.continew.house.controller.dto.response.HouseListResponse;
import com.btt.continew.house.domain.House;
import com.btt.continew.house.domain.HouseOption;
import com.btt.continew.house.domain.HouseOptionRepository;
import com.btt.continew.house.domain.HouseRepository;
import com.btt.continew.house.domain.Image;
import com.btt.continew.house.domain.ImageRepository;
import com.btt.continew.house.domain.Option;
import com.btt.continew.house.domain.OptionRepository;
import com.btt.continew.image.ImageUploader;
import com.btt.continew.member.domain.Member;
import com.btt.continew.member.service.MemberService;
import java.io.IOException;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class HouseService {

    private final HouseRepository houseRepository;
    private final OptionRepository optionRepository;
    private final HouseOptionRepository houseOptionRepository;
    private final ImageRepository imageRepository;
    private final MemberService memberService;
    private final ImageUploader imageUploader;

    public HouseService(HouseRepository houseRepository, OptionRepository optionRepository,
        HouseOptionRepository houseOptionRepository, ImageRepository imageRepository,
        MemberService memberService, ImageUploader imageUploader) {
        this.houseRepository = houseRepository;
        this.optionRepository = optionRepository;
        this.houseOptionRepository = houseOptionRepository;
        this.imageRepository = imageRepository;
        this.memberService = memberService;
        this.imageUploader = imageUploader;
    }

    @Transactional
    public void create(HouseSaveRequest request, List<MultipartFile> images, String email) {
        Member member = memberService.findByLoginId(email);
        House house = House.builder()
            .member(member)
            .deposit(request.getDeposit())
            .monthlyRent(request.getMonthlyRent())
            .maintenanceFee(request.getMaintenanceFee())
            .maintenanceDetail(request.getMaintenanceDetail())
            .description(request.getDescription())
            .sidoName(request.getSidoName())
            .gunguName(request.getGunguName())
            .dongName(request.getDongName())
            .jibunAddress(request.getJibunAddress())
            .addressDetail(request.getAddressDetail())
            .latitude(request.getLatitude())
            .longitude(request.getLongitude())
            .floor(request.getFloor())
            .houseType(request.getHouseType())
            .saleType(request.getSaleType())
            .period(request.getPeriod())
            .build();
        houseRepository.save(house);

        saveHouseOptions(request, house);
        saveImages(images, house);
    }

    private void saveImages(List<MultipartFile> images, House house) {
        for (MultipartFile file: images) {
           try{
               String url = imageUploader.upload(file, "house");

               Image image = Image.builder()
                   .house(house)
                   .url(url)
                   .build();

               imageRepository.save(image);
           } catch (IOException e) {
               throw new BusinessException(ErrorCode.GLOBAL_ILLEGAL_ERROR);
           }
       }
    }

    private void saveHouseOptions(HouseSaveRequest request, House house) {
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

    @Transactional(readOnly = true)
    public HouseListResponse showHouses(HouseListRequest request, Pageable pageable) {
        Page<House> houses = houseRepository.findAllByLatitudeBetweenAndLongitudeBetween(request.getYBottom(), request.getYTop(), request.getXLeft(),
            request.getXRight(), pageable);
        return HouseListResponse.from(houses);
    }

    @Transactional(readOnly = true)
    public House findById(Long houseId) {
        return houseRepository.findById(houseId)
            .orElseThrow(() -> new BusinessException(ErrorCode.HOUSE_NOT_FOUND_BY_ID));
    }

    @Transactional(readOnly = true)
    public HouseDetailResponse show(Long houseId) {
        House house = houseRepository.findById(houseId)
            .orElseThrow(() -> new BusinessException(ErrorCode.HOUSE_NOT_FOUND_BY_ID));
        List<HouseOption> houseOptions = houseOptionRepository.findAllByHouse(house);
        List<Image> images = imageRepository.findAllByHouse(house);
        return HouseDetailResponse.of(house, houseOptions, images);
    }

    @Transactional
    public void update(Long houseId, HouseSaveRequest request, List<MultipartFile> images, String loginId) {
        House house = houseRepository.findById(houseId)
            .orElseThrow(() -> new BusinessException(ErrorCode.HOUSE_NOT_FOUND_BY_ID));

        house.checkHouseByLoginId(loginId);
        house.update(request);

        houseOptionRepository.deleteHouseOptionsByHouse(houseId);
        saveHouseOptions(request, house);

        imageRepository.deleteImagesByHouses(houseId);
        saveImages(images, house);
    }

    @Transactional
    public void delete(Long houseId, String loginId) {
        House house = houseRepository.findById(houseId)
            .orElseThrow(() -> new BusinessException(ErrorCode.HOUSE_NOT_FOUND_BY_ID));

        house.checkHouseByLoginId(loginId);

        houseOptionRepository.deleteHouseOptionsByHouse(houseId);
        imageRepository.deleteImagesByHouses(houseId);
        house.saveDeletedTime();
    }
}
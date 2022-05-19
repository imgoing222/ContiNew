package com.btt.continew.house.service;

import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.btt.continew.house.controller.dto.request.HouseAroundRequest;
import com.btt.continew.house.controller.dto.request.HouseListRequest;
import com.btt.continew.house.controller.dto.request.HouseSaveRequest;
import com.btt.continew.house.controller.dto.response.HouseDetailResponse;
import com.btt.continew.house.controller.dto.response.HouseIdResponse;
import com.btt.continew.house.controller.dto.response.HouseListResponse;
import com.btt.continew.house.controller.dto.response.HouseLocationResponse;
import com.btt.continew.house.controller.dto.response.HouseSimpleResponse;
import com.btt.continew.house.controller.dto.response.HouseUpdateResponse;
import com.btt.continew.house.domain.House;
import com.btt.continew.house.domain.HouseRepository;
import com.btt.continew.house.domain.HouseRepositorySupport;
import com.btt.continew.house.domain.Image;
import com.btt.continew.house.domain.ImageRepository;
import com.btt.continew.image.ImageUploader;
import com.btt.continew.member.domain.Member;
import com.btt.continew.member.service.MemberService;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.imageio.ImageIO;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

@Service
public class HouseService {

    private final HouseRepository houseRepository;
    private final ImageRepository imageRepository;
    private final MemberService memberService;
    private final ImageUploader imageUploader;
    private final HouseRepositorySupport houseRepositorySupport;
    private final RestTemplate restTemplate;

    private static final int LISTING_PERIOD = 1;

    public HouseService(HouseRepository houseRepository, ImageRepository imageRepository,
        MemberService memberService, ImageUploader imageUploader,
        HouseRepositorySupport houseRepositorySupport, RestTemplate restTemplate) {
        this.houseRepository = houseRepository;
        this.imageRepository = imageRepository;
        this.memberService = memberService;
        this.imageUploader = imageUploader;
        this.houseRepositorySupport = houseRepositorySupport;
        this.restTemplate = restTemplate;
    }

    @Transactional
    public HouseIdResponse create(HouseSaveRequest request, List<MultipartFile> images, String email) {
        Member member = memberService.findByLoginId(email);

        if (houseRepository.existsByMemberAndExpiredAtAfter(member, LocalDateTime.now())) {
            throw new BusinessException(ErrorCode.HOUSE_ALREADY_EXISTS_BY_LOGINID);
        }

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
            .contractType(request.getContractType())
            .period(request.getPeriod())
            .expiredAt(LocalDateTime.now().plusMonths(LISTING_PERIOD))
            .options(request.getOptions().toString().substring(1, request.getOptions().toString().length() - 1))
            .build();
        houseRepository.save(house);

//        saveHouseOptions(request, house);
        saveImages(images, house);
        return new HouseIdResponse(house.getId());
    }

    private void saveImages(List<MultipartFile> images, House house) {
        int idx = 0;
        for (MultipartFile file : images) {
            try {
                String url = imageUploader.upload(file, "house");
                if (idx == 0) {
                    house.changeMainImage(url);
                }
                Image image = Image.builder()
                    .house(house)
                    .url(url)
                    .build();

                imageRepository.save(image);
            } catch (IOException e) {
                throw new BusinessException(ErrorCode.GLOBAL_ILLEGAL_ERROR);
            }
            idx++;
        }
    }

//    private void saveHouseOptions(HouseSaveRequest request, House house) {
//        if (!request.getOptions().isEmpty()){
//            for(Long optionId: request.getOptions()) {
//                Option option = optionRepository.findById(optionId)
//                    .orElseThrow(() -> new BusinessException(ErrorCode.OPTION_NOT_FOUND_BY_ID));
//                HouseOption houseOption = HouseOption.builder()
//                    .house(house)
//                    .option(option)
//                    .build();
//                houseOptionRepository.save(houseOption);
//            }
//        }
//    }

    @Transactional(readOnly = true)
    public HouseListResponse showHouses(HouseListRequest request, Pageable pageable) {
        Page<HouseSimpleResponse> responses = houseRepositorySupport.findHouses(request, pageable);
        return HouseListResponse.from(responses);
    }

    @Transactional(readOnly = true)
    public List<HouseLocationResponse> showAllHouses(HouseListRequest request) {
        return houseRepositorySupport.findAllHouses(request);
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
//        List<HouseOption> houseOptions = houseOptionRepository.findAllByHouse(house);
        List<Image> images = imageRepository.findAllByHouse(house);
        return HouseDetailResponse.of(house, images);
    }

    @Transactional(readOnly = true)
    public HouseDetailResponse showForUpdate(Long houseId) {
        House house = houseRepository.findById(houseId)
            .orElseThrow(() -> new BusinessException(ErrorCode.HOUSE_NOT_FOUND_BY_ID));
//        List<HouseOption> houseOptions = houseOptionRepository.findAllByHouse(house);
        List<Image> images = imageRepository.findAllByHouse(house);

        List<String> imagesBase64 = images.stream()
            .map(i -> imageToBase64Str(i))
            .collect(Collectors.toList());

        return HouseDetailResponse.ofForUpdate(house, imagesBase64);
    }

    @Transactional(readOnly = true)
    public MultiValueMap<String, Object> showForUpdateMultipartFile(Long houseId) {
        House house = houseRepository.findById(houseId)
            .orElseThrow(() -> new BusinessException(ErrorCode.HOUSE_NOT_FOUND_BY_ID));
//        List<HouseOption> houseOptions = houseOptionRepository.findAllByHouse(house);
        List<Image> images = imageRepository.findAllByHouse(house);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<String, Object>();

        List<MultipartFile> imagesMultipartFile = images.stream()
            .map(i -> imageToMultipartFile(i))
            .collect(Collectors.toList());
        try {
            for (MultipartFile file : imagesMultipartFile) {
                body.add("file", new ByteArrayResource(file.getBytes()));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return body;
    }

    private String imageToBase64Str(Image image) {
        try {
            String url = image.getUrl();
            URL imageUrl = new URL(url);
            BufferedImage img = ImageIO.read(imageUrl);

            File file = new File("downloaded.jpg");
            ImageIO.write(img, "jpg", file);

            InputStream finput = new FileInputStream(file);
            byte[] imageBytes = new byte[(int) file.length()];
            finput.read(imageBytes, 0, imageBytes.length);
            finput.close();
            String filePathName = url.replace("file:///", "");
            String fileExtName = filePathName.substring(filePathName.lastIndexOf(".") + 1);

            return Base64.encodeBase64String(imageBytes);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private MultipartFile imageToMultipartFile(Image image) {
        try {
            String url = image.getUrl();
            URL imageUrl = new URL(url);
            BufferedImage img = ImageIO.read(imageUrl);

            File file = new File("downloaded.jpg");
            ImageIO.write(img, "jpg", file);
            FileItem fileItem = new DiskFileItem("originFile", Files.probeContentType(file.toPath()), false, file.getName(),
                (int) file.length(), file.getParentFile());

            InputStream finput = new FileInputStream(file);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(finput, os);
            finput.close();
            os.close();
            MultipartFile mFile = new CommonsMultipartFile(fileItem);
            return mFile;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Transactional(readOnly = true)
    public HouseListResponse showAroundHouses(HouseAroundRequest request, Pageable pageable) {
        Page<House> houses = houseRepository.findAllBySidoNameAndGunguNameAndDongNameAndExpiredAtAfter(request.getSidoName(),
            request.getGunguName(), request.getDongName(), LocalDateTime.now(), pageable);
        return HouseListResponse.fromHouses(houses);
    }

    @Transactional(readOnly = true)
    public List<HouseSimpleResponse> showMyHouses(String loginId) {
        Member member = memberService.findByLoginId(loginId);
        List<House> houses = houseRepository.findAllByMemberOrderByIdDesc(member);
        return houses.stream()
            .map(HouseSimpleResponse::from)
            .collect(Collectors.toList());
    }

    @Transactional
    public void update(Long houseId, HouseSaveRequest request, List<MultipartFile> images, String loginId) {
        House house = houseRepository.findById(houseId)
            .orElseThrow(() -> new BusinessException(ErrorCode.HOUSE_NOT_FOUND_BY_ID));

        house.checkHouseByLoginId(loginId);
        house.update(request);

//        houseOptionRepository.deleteHouseOptionsByHouse(houseId);
//        saveHouseOptions(request, house);

        imageRepository.deleteImagesByHouses(houseId);
        saveImages(images, house);
    }

    @Transactional
    public void delete(Long houseId, String loginId) {
        House house = houseRepository.findById(houseId)
            .orElseThrow(() -> new BusinessException(ErrorCode.HOUSE_NOT_FOUND_BY_ID));

        house.checkHouseByLoginId(loginId);

//        houseOptionRepository.deleteHouseOptionsByHouse(houseId);
        imageRepository.deleteImagesByHouses(houseId);
        house.saveDeletedTime();
    }
}
package com.btt.continew.contract.service;

import com.btt.continew.contract.controller.dto.request.ContractAgreeRequest;
import com.btt.continew.contract.controller.dto.request.ContractRequest;
import com.btt.continew.contract.controller.dto.response.ContractAgreeResponse;
import com.btt.continew.contract.controller.dto.response.ContractResponse;
import com.btt.continew.contract.controller.dto.response.ContractSimpleResponse;
import com.btt.continew.contract.domain.Contract;
import com.btt.continew.contract.domain.ContractAgree;
import com.btt.continew.contract.domain.ContractAgreeRepository;
import com.btt.continew.contract.domain.ContractRepository;
import com.btt.continew.global.exception.BusinessException;
import com.btt.continew.global.exception.ErrorCode;
import com.btt.continew.house.domain.House;
import com.btt.continew.house.service.HouseService;
import com.btt.continew.member.domain.Member;
import com.btt.continew.member.service.MemberService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContractService {

    private final MemberService memberService;
    private final HouseService houseService;
    private final ContractAgreeRepository contractAgreeRepository;
    private final ContractRepository contractRepository;

    public ContractService(MemberService memberService, HouseService houseService,
        ContractAgreeRepository contractAgreeRepository, ContractRepository contractRepository) {
        this.memberService = memberService;
        this.houseService = houseService;
        this.contractAgreeRepository = contractAgreeRepository;
        this.contractRepository = contractRepository;
    }

    @Transactional
    public void agreeContract(ContractAgreeRequest request, String loginId) {
        Member sellerMember = memberService.findByLoginId(request.getSellerLoginId());
        Member buyerMember = memberService.findByLoginId(request.getBuyerLoginId());
        House house = houseService.findById(request.getHouseId());

        ContractAgree contractAgree = contractAgreeRepository.findByHouseAndSellerAndBuyer(house, sellerMember, buyerMember)
            .orElseGet(() -> contractAgreeRepository.save(
                ContractAgree.builder().house(house).seller(sellerMember).buyer(buyerMember).build()));

        switch (request.getMemberType()) {
            case "seller":
                checkSeller(loginId, sellerMember);
                if (contractAgree.getSellerAgree()) {
                    throw new BusinessException(ErrorCode.CONTRACT_ALREADY_AGREE);
                }
                contractAgree.sellerAgree();
                break;
            case "buyer":
                checkBuyer(loginId, buyerMember);
                if (contractAgree.getBuyerAgree()) {
                    throw new BusinessException(ErrorCode.CONTRACT_ALREADY_AGREE);
                }
                contractAgree.buyerAgree();
                break;
            default:
                throw new BusinessException(ErrorCode.CONTRACT_NOT_FOUND_MEMBER_TYPE);
        }

        if (contractAgree.getBuyerAgree() && contractAgree.getSellerAgree()) {
            contractRepository.save(Contract.builder().seller(sellerMember).buyer(buyerMember).house(house).build());
        }
    }

    @Transactional
    public void disagreeContract(ContractAgreeRequest request, String loginId) {
        Member sellerMember = memberService.findByLoginId(request.getSellerLoginId());
        Member buyerMember = memberService.findByLoginId(request.getBuyerLoginId());
        House house = houseService.findById(request.getHouseId());

        checkSellerOrBuyer(loginId, sellerMember.getLoginId(), buyerMember.getLoginId());

        ContractAgree contractAgree = contractAgreeRepository.findByHouseAndSellerAndBuyer(house, sellerMember, buyerMember)
            .orElseThrow(() -> new BusinessException(ErrorCode.CONTRACT_NOT_FOUND_CONTRACT_AGREE));

        if (contractAgree.getBuyerAgree() && contractAgree.getSellerAgree()) {
            throw new BusinessException(ErrorCode.CONTRACT_AGREE_ALREADY_COMPLETED);
        }

        contractAgree.saveDeletedTime();
    }

    @Transactional(readOnly = true)
    public ContractAgreeResponse viewContractAgree(Long houseId, String seller, String buyer, String loginId) {
        Member sellerMember = memberService.findByLoginId(seller);
        Member buyerMember = memberService.findByLoginId(buyer);
        House house = houseService.findById(houseId);

        checkSellerOrBuyer(loginId, sellerMember.getLoginId(), buyerMember.getLoginId());

        try {
            ContractAgree contractAgree = contractAgreeRepository.findByHouseAndSellerAndBuyer(house, sellerMember, buyerMember)
                .orElseThrow(() -> new BusinessException(ErrorCode.CONTRACT_NOT_FOUND_CONTRACT_AGREE));

            return ContractAgreeResponse.of(contractAgree.getHouse().getId(), contractAgree.getSellerAgree(),
                contractAgree.getBuyerAgree());
        } catch (BusinessException b) {
            return ContractAgreeResponse.of(houseId, false, false);
        }
    }

    private void checkSellerOrBuyer(String loginId, String buyer, String seller) {
        if (!buyer.equals(loginId) && !seller.equals(loginId)) {
            throw new BusinessException(ErrorCode.CONTRACT_NOT_YOUR_CONTRACT_AGREE);
        }
    }

    @Transactional
    public void saveContract(ContractRequest request, String loginId) {
        Member sellerMember = memberService.findByLoginId(request.getSellerLoginId());
        Member buyerMember = memberService.findByLoginId(request.getBuyerLoginId());
        House house = houseService.findById(request.getHouseId());

        Contract contract = contractRepository.findByHouseAndSellerAndBuyer(house, sellerMember, buyerMember)
            .orElseThrow(() -> new BusinessException(ErrorCode.CONTRACT_NOT_FOUND_CONTRACT));

        checkHisContract(loginId, contract);

        switch (contract.getLevel()) {
            case 1:
                checkSeller(loginId, sellerMember);
                contract.levelOneWrite(request);
                break;
            case 2:
                checkBuyer(loginId, buyerMember);
                contract.levelTwoWrite(request);
                break;
            case 3:
                checkSeller(loginId, sellerMember);
                contract.levelThreeWrite(request);
                house.saveExpiredAt();
                break;
            case 4:
                throw new BusinessException(ErrorCode.CONTRACT_ALREADY_FINISHED);
            default:
                throw new BusinessException(ErrorCode.CONTRACT_WEIRD_LEVEL);
        }
    }

    private void checkSeller(String loginId, Member sellerMember) {
        if (!sellerMember.getLoginId().equals(loginId)) {
            throw new BusinessException(ErrorCode.CONTRACT_NOT_SELLER);
        }
    }

    private void checkBuyer(String loginId, Member buyerMember) {
        if (!buyerMember.getLoginId().equals(loginId)) {
            throw new BusinessException(ErrorCode.CONTRACT_NOT_BUYER);
        }
    }

    @Transactional
    public void deleteContract(String loginId, Long houseId, String seller, String buyer) {
        Member sellerMember = memberService.findByLoginId(seller);
        Member buyerMember = memberService.findByLoginId(buyer);
        House house = houseService.findById(houseId);

        checkSellerOrBuyer(loginId, sellerMember.getLoginId(), buyerMember.getLoginId());

        ContractAgree contractAgree = contractAgreeRepository.findByHouseAndSellerAndBuyer(house, sellerMember, buyerMember)
            .orElseThrow(() -> new BusinessException(ErrorCode.CONTRACT_NOT_FOUND_CONTRACT_AGREE));
        Contract contract = contractRepository.findByHouseAndSellerAndBuyer(house, sellerMember, buyerMember)
            .orElseThrow(() -> new BusinessException(ErrorCode.CONTRACT_NOT_FOUND_CONTRACT));

        checkHisContract(loginId, contract);

        contractAgree.saveDeletedTime();
        contract.saveDeletedTime();
    }

    @Transactional(readOnly = true)
    public ContractResponse viewContract(String loginId, Long houseId, String seller, String buyer) {
        Member sellerMember = memberService.findByLoginId(seller);
        Member buyerMember = memberService.findByLoginId(buyer);
        House house = houseService.findById(houseId);

        Contract contract = contractRepository.findByHouseAndSellerAndBuyer(house, sellerMember, buyerMember)
            .orElseThrow(() -> new BusinessException(ErrorCode.CONTRACT_NOT_FOUND_CONTRACT));

        checkHisContract(loginId, contract);

        return ContractResponse.of(contract);
    }

    private void checkHisContract(String loginId, Contract contract) {
        if (!contract.getBuyer().getLoginId().equals(loginId) && !contract.getSeller().getLoginId().equals(loginId)) {
            throw new BusinessException(ErrorCode.CONTRACT_NOT_YOUR_CONTRACT);
        }
    }

    @Transactional(readOnly = true)
    public List<ContractSimpleResponse> showMyContracts(String loginId) {
        Member user = memberService.findByLoginId(loginId);
        List<Contract> contracts = contractRepository.findAllBySellerOrBuyer(user, user);
        return contracts.stream()
            .map(ContractSimpleResponse::from)
            .collect(Collectors.toList());
    }
}

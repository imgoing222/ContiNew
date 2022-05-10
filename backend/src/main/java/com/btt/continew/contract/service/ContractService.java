package com.btt.continew.contract.service;

import com.btt.continew.contract.controller.dto.request.ContractAgreeRequest;
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
            .orElse(contractAgreeRepository.save(
                ContractAgree.builder().house(house).seller(sellerMember).buyer(buyerMember).build()));

        switch (request.getMemberType()) {
            case "seller":
                if (!sellerMember.getLoginId().equals(loginId)) {
                    throw new BusinessException(ErrorCode.CONTRACT_NOT_SELLER);
                }
                if (contractAgree.getSellerAgree()) {
                    throw new BusinessException(ErrorCode.CONTRACT_ALREADY_AGREE);
                }
                contractAgree.sellerAgree();
                break;
            case "buyer":
                if (!buyerMember.getLoginId().equals(loginId)) {
                    throw new BusinessException(ErrorCode.CONTRACT_NOT_BUYER);
                }
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
}

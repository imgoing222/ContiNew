package com.btt.continew.house.service;

import com.btt.continew.house.controller.dto.request.HouseSaveRequest;
import com.btt.continew.house.domain.HouseRepository;
import com.btt.continew.member.domain.Member;
import com.btt.continew.member.service.MemberService;
import org.springframework.stereotype.Service;

@Service
public class HouseService {

    private final HouseRepository houseRepository;
    private final MemberService memberService;

    public HouseService(HouseRepository houseRepository, MemberService memberService) {
        this.houseRepository = houseRepository;
        this.memberService = memberService;
    }

    public void create(HouseSaveRequest request, String email) {
        Member member = memberService.findByEmail(email);

    }
}
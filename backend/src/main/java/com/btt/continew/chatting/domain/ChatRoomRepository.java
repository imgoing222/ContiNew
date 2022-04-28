package com.btt.continew.chatting.domain;

import com.btt.continew.member.domain.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface ChatRoomRepository extends CrudRepository<ChatRoom, String> {

    Page<ChatRoom> findAllBySellerOrBuyer(Member seller, Member buyer, Pageable pageable);

}

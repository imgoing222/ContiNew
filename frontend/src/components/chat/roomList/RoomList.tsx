import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { chatApi } from "src/api";
import { RoomListItem } from "@components/chat";
import { SET_ARTICLEINFO } from "src/store/articleInfo";

interface ChatListDataType {
	chat_rooms: {
		last_message: string;
		last_message_time: string;
		room_id: string;
		sale: number;
		buyer: string;
		buyer_id: string;
		seller: string;
		seller_id: string;
		main_image: string;
	}[];
	current_page_count: number;
	total_page_count: number;
}

interface ChatDataType {
	last_message: string;
	last_message_time: string;
	room_id: string;
	sale: number;
	buyer: string;
	buyer_id: string;
	seller: string;
	seller_id: string;
}

function RoomList() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [chatListData, setChatListData] = useState<ChatListDataType>({
		chat_rooms: [],
		current_page_count: 0,
		total_page_count: 0,
	});

	useEffect(() => {
		getChatList();
	}, []);

	const getChatList = async () => {
		try {
			const res = await chatApi.getChattingRoom();
			setChatListData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const toChattingRoom = (chatData: ChatDataType) => {
		const articleDataSet = {
			sale: chatData.sale,
			seller: chatData.seller,
			seller_id: chatData.seller_id,
			buyer: chatData.buyer,
			buyer_id: chatData.buyer_id,
		};
		dispatch(SET_ARTICLEINFO(articleDataSet));
		router.push(`/chat/${chatData.room_id}`);
		localStorage.setItem("RoomId", chatData.room_id);
	};

	return (
		<Container>
			<Title>
				<h2>Messages</h2>
			</Title>
			<Content>
				{chatListData.chat_rooms &&
					chatListData.chat_rooms.map((chat) => (
						<ContentContainer key={chat.room_id} onClick={() => toChattingRoom(chat)}>
							<RoomListItem chat={chat} />
						</ContentContainer>
					))}
			</Content>
		</Container>
	);
}

const Container = styled.div`
	width: 30rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-right: solid 2px #d3d3d3;

	@media ${(props) => props.theme.tabletS} {
		width: 40rem;
		flex-direction: row;
		border: none;
	}
`;

const Title = styled.div`
	width: 100%;
	height: 8rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: solid 2px #d3d3d3;

	@media ${(props) => props.theme.tabletS} {
		display: none;
	}
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
	min-height: 5rem;

	@media ${(props) => props.theme.tabletS} {
		display: flex;
		align-items: center;
	}
`;

const ContentContainer = styled.div`
	width: 80%;
	height: 8rem;
	margin: 0 auto;
	cursor: pointer;

	@media ${(props) => props.theme.tabletS} {
		width: 7rem;
		margin: 0 auto 0 0;
	}
`;

export default RoomList;

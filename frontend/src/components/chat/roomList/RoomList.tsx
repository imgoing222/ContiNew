import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { chatApi } from "src/api";
import { RoomListItem } from "@components/chat";
import { SET_ARTICLEINFO } from "src/store/articleInfo";

interface ChatListDataType {
	chat_rooms: {
		buyer: string;
		last_message: string;
		last_message_time: string;
		room_id: string;
		sale: number;
		seller: string;
	}[];
	current_page_count: number;
	total_page_count: number;
}

interface ChatDataType {
	buyer: string;
	last_message: string;
	last_message_time: string;
	room_id: string;
	sale: number;
	seller: string;
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
		const articleDataSet = { sale: chatData.sale, seller: chatData.seller, buyer: chatData.buyer };
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
`;

const Title = styled.div`
	width: 100%;
	height: 8rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: solid 2px #d3d3d3;
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
	min-height: 5rem;
`;

const ContentContainer = styled.div`
	width: 80%;
	height: 8rem;
	margin: 0 auto;
	cursor: pointer;
`;

export default RoomList;

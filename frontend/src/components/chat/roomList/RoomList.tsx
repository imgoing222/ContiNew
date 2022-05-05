import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { chatApi } from "src/api";
import { ChatListItem } from "@components/chat";

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

function RoomList() {
	const router = useRouter();
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

	const toChattingRoom = (roomId: string) => {
		router.push(`/chat/${roomId}`);
	};

	return (
		<Container>
			<Title>
				<h2>Messages</h2>
			</Title>
			{chatListData.chat_rooms &&
				chatListData.chat_rooms.slice(0).map((chat) => (
					<Content key={chat.room_id} onClick={() => toChattingRoom(chat.room_id)}>
						<ChatListItem chat={chat} />
					</Content>
				))}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex: 2;
	flex-direction: column;
	align-items: center;
	height: 100%;
	border-right: solid 2px #d3d3d3;
`;

const Title = styled.div`
	width: 100%;
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: solid 2px #d3d3d3;
`;

const Content = styled.div`
	width: 80%;
	height: 8rem;
	cursor: pointer;
`;

export default RoomList;

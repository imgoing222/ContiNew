import { useState, useEffect } from "react";
import styled from "styled-components";

import { chatApi } from "src/api";

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

function ChatList() {
	const [chatListData, setChatListData] = useState<ChatListDataType>({
		chat_rooms: [],
		current_page_count: 0,
		total_page_count: 0,
	});

	const getChatList = async () => {
		try {
			const res = await chatApi.getChat();
			setChatListData(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getChatList();
	}, []);

	return (
		<Container>
			<Title>
				<h3>Messages</h3>
			</Title>
			<div>
				{chatListData.chat_rooms &&
					chatListData.chat_rooms.map((chat) => (
						<div key={chat.room_id}>
							<p>{chat.buyer}</p>
							<p>{chat.last_message}</p>
						</div>
					))}
			</div>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex: 2;
	flex-direction: column;
	align-items: center;
	width: 300px;
	height: 100%;
	border-right: solid 2px #d3d3d3;
`;

const Title = styled.div`
	width: 100%;
	text-align: center;
	border-bottom: solid 2px #d3d3d3;
`;

export default ChatList;

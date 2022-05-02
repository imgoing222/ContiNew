import { useState, useEffect } from "react";
import styled from "styled-components";

import { chatApi } from "src/api";
import { Chat, ChatList, ItemDetail } from "@components/chat";

function ChatPage() {
	const [chatListData, setChatListData] = useState({
		chat_rooms: [
			{
				buyer: "",
				last_message: "",
				last_message_time: "",
				room_id: "",
				sale: 0,
				seller: "",
			},
		],
		current_page_count: 0,
		total_page_count: 0,
	});

	const getChatList = async () => {
		try {
			const res = await chatApi.getChat();
			setChatListData(res.data);
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getChatList();
	}, []);

	return (
		<Container>
			<ChatList chatList={chatListData} />
			<Chat />
			<ItemDetail />
		</Container>
	);
}

const Container = styled.div`
	height: 70vh;
	display: flex;
	align-items: center;
	margin: 10rem;
	border: solid 2px #d3d3d3;
`;

export default ChatPage;

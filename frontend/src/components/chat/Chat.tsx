import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { chatApi } from "src/api";
import React from "react";

interface SendMessageProps {
	sendMessage?: () => void;
	roomId?: string | string[] | undefined;
}

interface ChatDataType {
	sendMessage: {};
	buyer: string;
	lastMessage: string;
	lastMessageTime: string;
	id: string;
	sale: number;
	seller: string;
}

interface ChattingsType {
	chat_message: {
		room_id: string;
		sender: string;
		content: string;
		read_at: string;
		created_at: string;
	}[];
	total_page_count: number;
	current_page_count: number;
}

function Chat({ sendMessage, roomId }: SendMessageProps) {
	const router = useRouter();
	const [chattings, setChattings] = useState<ChattingsType>({
		chat_message: [],
		current_page_count: 0,
		total_page_count: 0,
	});
	const DATA_SET = {
		buyer: "mmmm",
		seller: "Seller",
		sale: 1,
	};

	const createChattingRoom = async () => {
		try {
			const res = await chatApi.createChattingRoom(DATA_SET);
			toChattingRoom(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const toChattingRoom = (chatData: ChatDataType) => {
		router.push(`/chat/${chatData.id}`);
	};

	const sendMessageHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (sendMessage) sendMessage();
	};

	useEffect(() => {
		getChatList();
	}, []);

	const getChatList = async () => {
		try {
			const res = await chatApi.getChatList(roomId);
			setChattings(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Title>
				<h3>여긴 채팅창</h3>
			</Title>
			<button onClick={createChattingRoom}>채팅방생성[임시]</button>
			{roomId && (
				<div>
					<div>
						{chattings.chat_message && chattings.chat_message.map((chat) => (
							<p>{chat.content}</p>
						))}
					</div>
					<form onSubmit={sendMessageHandler}>
						<textarea />
						<button>보내기</button>
					</form>
				</div>
			)}
		</Container>
	);
}

const Container = styled.div`
	flex: 6;
	height: 100%;
`;

const Title = styled.div`
	width: 100%;
	height: 5rem;
	text-align: center;
	border-bottom: solid 2px #d3d3d3;
`;

export default Chat;

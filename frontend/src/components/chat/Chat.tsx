import { useRouter } from "next/router";
import styled from "styled-components";

import { chatApi } from "src/api";
import React from "react";

interface SendMessageProps {
	sendMessage?: () => void;
}

interface chatDataType {
	buyer: string;
	lastMessage: string;
	lastMessageTime: string;
	id: string;
	sale: number;
	seller: string;
}

function Chat({ sendMessage }: SendMessageProps) {
	const router = useRouter();
	const DATA_SET = {
		buyer: "mmmm",
		seller: "Seller",
		sale: 1,
	};

	const createChattingRoom = async () => {
		try {
			const res = await chatApi.createChat(DATA_SET);
			toChattingRoom(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const toChattingRoom = (chatData: chatDataType) => {
		router.push(`chat/${chatData.id}`);
	};

	const sendMessageHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (sendMessage) sendMessage();
	};

	return (
		<Container>
			<Title>
				<h3>여긴 채팅창</h3>
			</Title>
			<button onClick={createChattingRoom}>채팅방생성[임시]</button>
			{sendMessage && (
				<form onSubmit={sendMessageHandler}>
					<textarea />
					<button>보내기</button>
				</form>
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

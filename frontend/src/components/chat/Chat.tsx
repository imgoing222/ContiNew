import { useState } from "react";
import styled from "styled-components";

import { chatApi } from "src/api";

function Chat() {
	const [chatData, setChatData] = useState({
		buyer: "",
		lastMessage: "",
		lastMessageTime: "",
		roomId: "",
		sale: 0,
		seller: "",
	});
	const DATA_SET = {
		buyer: "Buyer",
		seller: "Seller",
		sale: 1,
	};

	const createChattingRoom = async () => {
		try {
			const res = await chatApi.createChat(DATA_SET);
			setChatData(res.data);
			console.log(res.data);
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
		</Container>
	);
}

const Container = styled.div`
	flex: 6;
	height: 100%;
`;

const Title = styled.div`
	width: 100%;
	text-align: center;
	border-bottom: solid 2px #d3d3d3;
`;

export default Chat;

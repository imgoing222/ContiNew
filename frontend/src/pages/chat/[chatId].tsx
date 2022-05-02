import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import StompJS from "stompjs";
import cookie from "react-cookies";
import styled from "styled-components";

import { Chat, ChatList, ItemDetail } from "@components/chat";

function ChatDetail({ params }: any) {
	const roomId = params;
	const [chattings, setChattings] = useState();

	const token = cookie.load("access_token");
	const sock = new SockJS("http://localhost:8080/ws-stomp");
	const stomp = StompJS.over(sock);

	useEffect(() => {
		stomp.connect({ Authorization: `Bearer ${token}` }, () => {
			console.log("Connected");

			stomp.subscribe(`/sub/chat/room/${roomId}`, (message) => {
				console.log(message);
				const receivedChatting = JSON.parse(message.body);
				console.log(receivedChatting);
			});
		});
	});

	return (
		<Container>
			<ChatList />
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

export function getServerSideProps({ params: { params } }: any) {
	return {
		props: {
			params,
		},
	};
}

export default ChatDetail;

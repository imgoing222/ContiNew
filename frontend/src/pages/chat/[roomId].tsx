import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import SockJS from "sockjs-client";
import StompJS from "stompjs";
import cookie from "react-cookies";
import styled from "styled-components";

import { Chat, ChatList, ItemDetail } from "@components/chat";

function ChatDetail() {
	const router = useRouter();
	const queryData = router.query;
	const roomId = queryData.roomId;
	const [chattings, setChattings] = useState();

	const token = cookie.load("access_token");
	const sock = new SockJS("http://localhost:8080/ws-stomp");
	const stomp = StompJS.over(sock);

	useEffect(() => {
		stomp.connect({ Authorization: `Bearer ${token}` }, () => {
			console.log("Connected");

			stomp.subscribe(`/sub/chat/room/${roomId}`, (message) => {
				const receivedChatting = JSON.parse(message.body);
				console.log(receivedChatting);
			});
		});
	}, []);

	const sendMessage = (type: string) => {
		stomp.send(
			"/pup/chat/message",
			{ Authorization: `Bearer ${token}` },
			JSON.stringify({ type: type, roomId: roomId, message: "hello" }),
		);
	};

	return (
		<Container>
			<ChatList />
			<Chat sendMessage={sendMessage} />
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

export default ChatDetail;

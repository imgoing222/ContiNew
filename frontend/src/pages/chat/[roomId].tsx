import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import SockJS from "sockjs-client";
import StompJS from "stompjs";
import cookie from "react-cookies";
import styled from "styled-components";

import { Chat, ChatList, ItemDetail } from "@components/chat";

function ChatDetail() {
	const router = useRouter();
	const { roomId } = router.query;

	const token = cookie.load("access_token");
	const sock = new SockJS("http://localhost:8080/ws-stomp");
	const stomp = StompJS.over(sock);

	useEffect(() => {
		stomp.connect({ Authorization: `Bearer ${token}` }, () => {
			stomp.subscribe(`/sub/chat/room/${roomId}`, (message) => {
				const receivedChatting = JSON.parse(message.body);
				console.log(receivedChatting);
				console.log("메시지 받았어요");
			});
		});
	}, []);

	const disConnect = () => {
		stomp.disconnect(() => {
			stomp.unsubscribe("sub-0");
		});
		console.log("disconnect");
	};

	const sendMessage = () => {
		stomp.send(
			"/pub/chat/message",
			{ Authorization: `Bearer ${token}` },
			JSON.stringify({ type: "TALK", room_id: roomId, sender: "mmmm", content: "hello" }),
		);
	};

	return (
		<Container>
			<ChatList />
			<Chat sendMessage={sendMessage} roomId={roomId} />
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

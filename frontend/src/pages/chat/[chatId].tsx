import { useEffect, useState, useRef } from "react";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
import styled from "styled-components";

import { Chat, ChatList, ItemDetail } from "@components/chat";

function ChatDetail() {
	const [socketConnected, setSocketConnected] = useState(false);
	const [sendMessage, setSendMessage] = useState("");

	const webSocketUrl = "ws://localhost:8080/ws/chat";
	let ws = useRef<WebSocket | null>(null);

	useEffect(() => {
		if (!ws.current) {
			ws.current = new WebSocket(webSocketUrl);
			ws.current.onopen = () => {
				console.log("connected to " + webSocketUrl);
				setSocketConnected(true);
			};
			ws.current.onclose = () => {
				console.log("disconnect from " + webSocketUrl);
			};
			ws.current.onerror = (error) => {
				console.log("connenction error " + webSocketUrl);
				console.log(error);
			};
			ws.current.onmessage = (evnet) => {
				const data = JSON.parse(evnet.data);
				console.log(data);
			};
		}
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

export default ChatDetail;

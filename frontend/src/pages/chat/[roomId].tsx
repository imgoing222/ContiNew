import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import StompJS from "stompjs";
import cookie from "react-cookies";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

import { Chat, RoomList, ItemDetail } from "@components/chat";

interface ReceivedChatDataType {
	room_id: string;
	sender: string;
	content: string;
	type: string;
	created_at: string;
}

function ChatDetail() {
	const roomId = localStorage.getItem("RoomId");
	const { username } = useSelector((state: RootState) => state.userInfo);
	const [receivedChatData, setReceivedChatData] = useState<ReceivedChatDataType>();
	const isConnected = useRef(false);

	const token = cookie.load("access_token");
	const sock = new SockJS(String(process.env.NEXT_PUBLIC_SOCKET_URL));
	const stomp = StompJS.over(sock);
	stomp.debug = () => {};

	useEffect(() => {
		stomp.connect({ Authorization: `Bearer ${token}` }, () => {
			isConnected.current = true;
			stomp.subscribe(`/sub/chat/room/${roomId}`, (message) => {
				const receivedChatting = JSON.parse(message.body);
				setReceivedChatData(receivedChatting);
			});
		});
		return () => {
			if (isConnected.current) {
				disConnect();
			}
		};
	}, [roomId]);

	const disConnect = () => {
		stomp.disconnect(() => {
			stomp.unsubscribe("sub-0");
		});
		isConnected.current = false;
	};

	const sendMessage = (inputChat: string) => {
		if (inputChat) {
			const sendTime = new Date(+new Date() + 3240 * 10000)
				.toISOString()
				.replace("T", " ")
				.replace(/\..*/, "");
			stomp.send(
				"/pub/chat/message",
				{ Authorization: `Bearer ${token}` },
				JSON.stringify({
					type: "TALK",
					room_id: roomId,
					sender: username,
					content: inputChat,
					created_at: sendTime,
				}),
			);
		}
	};

	return (
		<Container>
			<RoomList />
			<Chat sendMessage={sendMessage} roomId={roomId} receivedChatData={receivedChatData} />
			<ItemDetail sendMessage={sendMessage} />
		</Container>
	);
}

const Container = styled.div`
	width: 130rem;
	height: 75vh;
	display: flex;
	align-items: center;
	margin: 10rem auto;
	border: solid 2px #d3d3d3;

	@media ${(props) => props.theme.tabletS} {
		width: 40rem;
		height: 100%;
		flex-direction: column;
		border: none;
	}
`;

export default ChatDetail;

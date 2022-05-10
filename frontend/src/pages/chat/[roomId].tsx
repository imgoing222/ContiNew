import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
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
	const router = useRouter();
	// const { roomId } = router.query;
	const roomId = localStorage.getItem("RoomId");
	const { login_id } = useSelector((state: RootState) => state.userInfo);
	const [receivedChatData, setReceivedChatData] = useState<ReceivedChatDataType>();

	const token = cookie.load("access_token");
	const sock = new SockJS("http://localhost:8080/ws-stomp");
	const stomp = StompJS.over(sock);
	// stomp.debug = null;

	useEffect(() => {
		stomp.connect({ Authorization: `Bearer ${token}` }, () => {
			stomp.subscribe(`/sub/chat/room/${roomId}`, (message) => {
				const receivedChatting = JSON.parse(message.body);
				setReceivedChatData(receivedChatting);
			});
		});
	}, [roomId]);

	const disConnect = () => {
		stomp.disconnect(() => {
			stomp.unsubscribe("sub-0");
		});
		console.log("disconnect");
	};

	const sendMessage = (inputChat: string) => {
		if (inputChat) {
			stomp.send(
				"/pub/chat/message",
				{ Authorization: `Bearer ${token}` },
				JSON.stringify({ type: "TALK", room_id: roomId, sender: login_id, content: inputChat, created_at: null }),
			);
		}
	};

	return (
		<Container>
			<RoomList />
			<Chat sendMessage={sendMessage} roomId={roomId} receivedChatData={receivedChatData} />
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

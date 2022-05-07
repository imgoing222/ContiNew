import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "src/store";

import { chatApi } from "src/api";
import { BottomSection, ChatListItem } from "@components/chat";

interface Props {
	sendMessage?: (inputChat: string) => void;
	roomId?: string | string[] | undefined;
	receivedData?: {
		room_id: string;
		sender: string;
		content: string;
		type: string;
	};
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
	chat_message: ChatMessageType[];
	total_page_count: number;
	current_page_count: number;
}

interface ChatMessageType {
	room_id: string;
	sender: string;
	content: string;
	read_at: string;
	created_at: string;
}

interface ShowChatListType {
	room_id: string;
	sender: string;
	content: string;
	read_at?: string;
	created_at?: string;
	type?: string;
}

function Chat({ sendMessage, roomId, receivedData }: Props) {
	const router = useRouter();
	const chatBoxRef = useRef<HTMLDivElement>(null);
	const { login_id } = useSelector((state: RootState) => state.userInfo);
	const [chattings, setChattings] = useState<ChattingsType>({
		chat_message: [],
		current_page_count: 0,
		total_page_count: 0,
	});
	const [showChatList, setShowChatList] = useState<ShowChatListType[]>([]);

	const DATA_SET = {
		buyer: login_id,
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

	useEffect(() => {
		getChatList();
	}, []);

	useEffect(() => {
		addChat(chattings.chat_message);
	}, [chattings]);

	useEffect(() => {
		if (receivedData) {
			setShowChatList((prevShowChatList) => {
				return [receivedData, ...prevShowChatList];
			});
		}
	}, [receivedData]);

	useEffect(() => {
		scrollToBottom();
	}, [showChatList]);

	const getChatList = async () => {
		try {
			const res = await chatApi.getChatList(roomId);
			setChattings(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const addChat = (chatMessage: ChatMessageType[]) => {
		chatMessage.map((chat) =>
			setShowChatList((prevShowChatList) => {
				return [...prevShowChatList, chat];
			}),
		);
	};

	const scrollToBottom = () => {
		if (chatBoxRef.current) {
			chatBoxRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	};

	return (
		<Container>
			<Title>
				<h3>여긴 채팅창</h3>
				<button onClick={createChattingRoom}>채팅방생성[임시]</button>
			</Title>
			{roomId && (
				<Content>
					<TopSection>
						<ul>
							{showChatList &&
								showChatList
									.slice(0)
									.reverse()
									.map((chat, idx) => <ChatListItem key={idx} chat={chat} />)}
						</ul>
						<div ref={chatBoxRef} />
					</TopSection>
					<BottomSection sendMessage={sendMessage} />
				</Content>
			)}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	flex: 6;
	height: 100%;
`;

const Title = styled.div`
	width: 100%;
	height: 5rem;
	text-align: center;
	border-bottom: solid 2px #d3d3d3;
`;

const Content = styled.div`
	margin-top: auto;
	display: flex;
	flex-direction: column;
`;

const TopSection = styled.div`
	height: 50rem;
	display: flex;
	margin: 1rem 0;
	flex-direction: column;
	overflow: auto;
`;

export default Chat;

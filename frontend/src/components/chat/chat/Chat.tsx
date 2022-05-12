import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "src/store";

import { chatApi } from "src/api";
import { BottomSection, ChatListItem } from "@components/chat";
import { SET_ARTICLEID } from "src/store/articleId";

interface Props {
	sendMessage?: (inputChat: string) => void;
	roomId?: string | null;
	receivedChatData?: {
		room_id: string;
		sender: string;
		content: string;
		type: string;
		created_at: string;
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

interface SavedChattingsType {
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
	created_at: string;
	type?: string;
}

function Chat({ sendMessage, roomId, receivedChatData }: Props) {
	const router = useRouter();
	const dispatch = useDispatch();
	const chatBoxRef = useRef<HTMLDivElement>(null);
	const { login_id } = useSelector((state: RootState) => state.userInfo);
	const [savedChattings, setSavedChattings] = useState<SavedChattingsType>({
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
			dispatch(SET_ARTICLEID(DATA_SET.sale));
			toChattingRoom(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const toChattingRoom = (chatData: ChatDataType) => {
		router.push(`/chat/${chatData.id}`);
	};

	useEffect(() => {
		setShowChatList([]);

		getChatList();
	}, [roomId]);

	useEffect(() => {
		addChat(savedChattings.chat_message);
	}, [savedChattings]);

	useEffect(() => {
		if (receivedChatData) {
			setShowChatList((prevShowChatList) => [receivedChatData, ...prevShowChatList]);
		}
	}, [receivedChatData]);

	useEffect(() => {
		scrollToBottom();
	}, [showChatList]);

	const getChatList = async () => {
		try {
			if (roomId) {
				const res = await chatApi.getChatList(roomId);
				setSavedChattings(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const addChat = (chatMessage: ChatMessageType[]) => {
		setShowChatList(chatMessage);
		// chatMessage.map((chat) => setShowChatList((prevShowChatList) => [...prevShowChatList, chat]));
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
			<Content>
				{roomId && (
					<>
						<TopSection>
							<ul>
								{showChatList &&
									showChatList.map((chat, idx) => <ChatListItem key={idx} chat={chat} />)}
							</ul>
							<div ref={chatBoxRef} />
						</TopSection>
						<BottomSection sendMessage={sendMessage} />
					</>
				)}
			</Content>
		</Container>
	);
}

const Container = styled.div`
	width: 60rem;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	width: 100%;
	height: 8rem;
	text-align: center;
	border-bottom: solid 2px #d3d3d3;
`;

const Content = styled.div`
	height: 100%;
	min-height: 5rem;
	margin-top: auto;
	display: flex;
	flex-direction: column;
`;

const TopSection = styled.div`
	height: 100%;
	display: flex;
	margin: 1rem 0;
	flex-direction: column;
	overflow: auto;
`;

export default Chat;

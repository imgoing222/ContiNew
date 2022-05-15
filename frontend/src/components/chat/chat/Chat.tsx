import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "src/store";

import { chatApi } from "src/api";
import { BottomSection, ChatListItem } from "@components/chat";
import useInfiniteScroll from "@hooks/useInfiniteScroll";
import { SET_ARTICLEINFO } from "src/store/articleInfo";

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

interface ChatMessageType {
	room_id: string;
	sender: string;
	content: string;
	read_at: string;
	created_at: string;
}

interface ChatListType {
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
	const { login_id, username } = useSelector((state: RootState) => state.userInfo);
	const [showChatList, setShowChatList] = useState<ChatListType[]>([]);

	const {
		setTarget,
		savedChatMessage,
		isLoading,
		currentPage,
		setCurrentPage,
		setSavedChatMessage,
		prevScrollHeight,
		setPrevScrollHeight,
	} = useInfiniteScroll({
		roomId,
		chatBoxRef,
		requestApi: (roomId, currentPage) => {
			return chatApi.getChatList(roomId, currentPage);
		},
	});

	const DATA_SET = {
		buyer: username,
		buyerId: login_id,
		seller: "Seller",
		sellerId: "Seller",
		sale: 1,
	};

	const createChattingRoom = async () => {
		try {
			const res = await chatApi.createChattingRoom(DATA_SET);
			dispatch(SET_ARTICLEINFO(DATA_SET));
			toChattingRoom(res.data.id);
		} catch (error) {
			console.log(error);
		}
	};

	const toChattingRoom = (roomId: string) => {
		router.push(`/chat/${roomId}`);
		localStorage.setItem("RoomId", roomId);
	};

	useEffect(() => {
		setCurrentPage(0);
		setSavedChatMessage([]);
		setShowChatList([]);
	}, [roomId]);

	useEffect(() => {
		if (currentPage) {
			setShowChatList((prev) => [...prev, ...savedChatMessage]);
		} else {
			setShowChatList(savedChatMessage);
		}
	}, [savedChatMessage]);

	useEffect(() => {
		if (receivedChatData) {
			setShowChatList((prev) => [receivedChatData, ...prev]);
		}
	}, [receivedChatData]);

	useEffect(() => {
		handleScroll();
	}, [showChatList]);

	const handleScroll = () => {
		if (chatBoxRef.current) {
			if (prevScrollHeight) {
				chatBoxRef.current.scrollTo({
					top: chatBoxRef.current.scrollHeight - prevScrollHeight,
				});
				return setPrevScrollHeight(null);
			}

			chatBoxRef.current.scrollTo({
				top: chatBoxRef.current.scrollHeight - chatBoxRef.current.clientHeight,
			});
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
						<TopSection ref={chatBoxRef}>
							{<div ref={setTarget}>{isLoading && <p></p>}</div>}
							<ul>
								{showChatList &&
									showChatList
										.slice(0)
										.reverse()
										.map((chat, idx) => <ChatListItem key={idx} chat={chat} />)}
							</ul>
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

const Textarea = styled.textarea`
	font-size: 2rem;
	border: solid 1px #d3d3d3;
	resize: none;
	border-radius: 10px;
`;

export default Chat;

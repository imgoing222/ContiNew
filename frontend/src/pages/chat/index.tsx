import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Chat, RoomList, ItemDetail } from "@components/chat";
import { SET_ARTICLEID } from "src/store/articleId";

function ChatPage() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(SET_ARTICLEID(0));
	});

	return (
		<Container>
			<RoomList />
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

export default ChatPage;

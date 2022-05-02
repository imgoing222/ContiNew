import styled from "styled-components";

import { Chat, ChatList, ItemDetail } from "@components/chat";

function ChatPage() {
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

export default ChatPage;

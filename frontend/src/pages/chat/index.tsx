import styled from "styled-components";

import ChatList from "@components/chat/ChatList";

function ChatPage() {
	return (
		<Container>
			<ChatList />
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

import styled from "styled-components";

import { RoomList, ChatMain } from "@components/chat";

function ChatPage() {

	return (
		<Container>
			<RoomList />
			<ChatMain />
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
`;

export default ChatPage;

import styled from "styled-components";

interface ChatListProps {
	chatList?: {
		chatId: number;
		user: string;
		person: string;
		lastContent: string;
		updatedAt: string;
	}[];
}

function ChatList({ chatList }: ChatListProps) {
	return (
		<Container>
			<Title>
				<h3>Messages</h3>
			</Title>
			<div>
				{chatList && chatList.map((chat) => (
					<div key={chat.chatId}>
						<p>{chat.person}</p>
						<p>{chat.lastContent}</p>
					</div>
				))}
			</div>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
  flex: 2;
	flex-direction: column;
	align-items: center;
	width: 300px;
	height: 100%;
	border-right: solid 2px #d3d3d3;
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: solid 2px #d3d3d3;
`;

export default ChatList;

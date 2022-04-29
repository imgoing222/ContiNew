import styled from "styled-components";

interface ChatListProps {
	chatList?: {
		chat_rooms: {
			buyer: string;
			last_message: string;
			last_message_time: string;
			room_id: string;
			sale: number;
			seller: string;
		}[];
		current_page_count: number;
		total_page_count: number;
	};
}

function ChatList({ chatList }: ChatListProps) {
	return (
		<Container>
			<Title>
				<h3>Messages</h3>
			</Title>
			<div>
				{chatList?.chat_rooms &&
					chatList.chat_rooms.map((chat) => (
						<div key={chat.room_id}>
							<p>{chat.buyer}</p>
							<p>{chat.last_message}</p>
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

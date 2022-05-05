import styled from "styled-components";

interface ChatProps {
	chat: {
		buyer: string;
		last_message: string;
		last_message_time: string;
		room_id: string;
		sale: number;
		seller: string;
	};
}

function ChatListItem({ chat }: ChatProps) {
	return (
		<Container>
			<LeftSection>
				<h3>{chat.seller}</h3>
				<div>{chat.last_message}</div>
			</LeftSection>
			<RightSection>
				<div>Img</div>
				<div>시간</div>
			</RightSection>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
`;

const LeftSection = styled.div`
	display: flex;
	flex-direction: column;
`;

const RightSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default ChatListItem;

import styled from "styled-components";

interface ChatListProps {
  chatList: {
    chatId: number;
		sellerNickname: string;
		buyerNickname: string;
		lastContent: string;
		updatedAt: string;
  }[]
}

function ChatList({ chatList }: ChatListProps) {
	return (
		<Container>
			<div>
				<h3>Messages</h3>
			</div>
			<div>
				<div>
					<p>닉네임</p>
					<p>최근메시지</p>
				</div>
				<div>
					<p>닉네임</p>
					<p>최근메시지</p>
				</div>
				<div>
					<p>닉네임</p>
					<p>최근메시지</p>
				</div>
				<div>
					<p>닉네임</p>
					<p>최근메시지</p>
				</div>
			</div>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
  width: 300px;
  height: 100%;
	border-right: solid 2px #d3d3d3;
`;

export default ChatList;

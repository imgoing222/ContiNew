import styled from "styled-components";

interface ChatProps {
	chat: {
		room_id: string;
		sender: string;
		content: string;
		read_at: string;
		created_at: string;
	};
}

function ChatListitem({ chat }: ChatProps) {
	return (
		<Container>
			<Textarea name="content" cols={20} readOnly>{chat.content}</Textarea>
		</Container>
	);
}

const Container = styled.div`
  margin: 1rem;
`;

const Textarea = styled.textarea`
	font-size: 2rem;
	border: solid 1px #d3d3d3;
	resize: none;
	border-radius: 10px;
`;

export default ChatListitem;

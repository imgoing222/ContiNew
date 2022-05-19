import { useSelector } from "react-redux";
import { RootState } from "src/store";
import styled from "styled-components";

interface ChatProps {
	chat: {
		room_id: string;
		sender: string;
		content: string;
		read_at?: string;
		created_at: string;
		type?: string;
	};
}

interface ContainerProps {
	user: string;
	sender: string;
}

function ChatListitem({ chat }: ChatProps) {
	const { username } = useSelector((state: RootState) => state.userInfo);

	return (
		<Container user={username} sender={chat.sender}>
			<SubContainer>
				<TextContainer user={username} sender={chat.sender}>
					<Textarea>
						{chat.content.split("\n").map((line, idx) => (
							<span key={idx}>
								{line}
								<br />
							</span>
						))}
					</Textarea>
				</TextContainer>
				<Time user={username} sender={chat.sender}>
					{chat.created_at?.slice(-8, -3)}
				</Time>
			</SubContainer>
		</Container>
	);
}

const Container = styled.div<ContainerProps>`
	margin: 1rem;
	display: flex;
	justify-content: ${({ user, sender }) => (user === sender ? "end" : "start")};
`;

const SubContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const TextContainer = styled.div<ContainerProps>`
	max-width: 45rem;
	display: flex;
	justify-content: center;
	border: solid 1px #d3d3d3;
	border-radius: 10px;
	background-color: ${({ user, sender }) => (user === sender ? "#f5f5f5" : "#ffffff")};

	@media ${(props) => props.theme.tabletS} {
		max-width: 27rem;
	}
`;

const Textarea = styled.div`
	font-size: 2rem;
	padding: 1rem;
`;

const Time = styled.div<ContainerProps>`
	display: flex;
	justify-content: ${({ user, sender }) => (user === sender ? "start" : "end")};
`;

export default ChatListitem;

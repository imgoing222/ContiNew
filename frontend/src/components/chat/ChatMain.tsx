import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

function ChatMain() {
	return (
		<Container>
			<Content>
				<FontAwesome icon={faComments} />
				<Title>내 메시지</Title>
				<Message>메시지를 통해 부족한 정보를 확인하세요.</Message>
			</Content>
		</Container>
	);
}

const Container = styled.div`
	width: 100rem;
	height: 100%;
	display: flex;
	justify-content: center;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1`
  font-size: 4rem;
`;

const Message = styled.p`
  font-size: 2rem;
`;

const FontAwesome = styled(FontAwesomeIcon)`
	width: 20rem;
	height: 20rem;
  // color: #dc143c;
	margin-right: 1.5rem;
`;

export default ChatMain;

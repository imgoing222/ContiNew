import styled from "styled-components";

function ChatMain() {
	return (
		<Container>
			<Content>
				<div>메시지 아이콘</div>
				<h2>내 메시지</h2>
				<p>메시지를 통해 부족한 정보를 확인하세요.</p>
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

export default ChatMain;

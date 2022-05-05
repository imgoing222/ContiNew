import styled from "styled-components";

function ChatListItem() {
	return (
		<Container>
			<LeftSection>
				<div>닉네임</div>
				<div>최근 메시지</div>
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

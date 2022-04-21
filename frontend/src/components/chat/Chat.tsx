import styled from "styled-components";

function Chat() {
	return (
		<Container>
			<Title>
				<h3>여긴 채팅창</h3>
			</Title>
		</Container>
	);
}

const Container = styled.div`
	flex: 6;
	height: 100%;
`;

const Title = styled.div`
	width: 100%;
	text-align: center;
	border-bottom: solid 2px #d3d3d3;
`;

export default Chat;

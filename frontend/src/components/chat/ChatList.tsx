import styled from "styled-components";

function ChatList() {
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
	border-right: solid 2px #d3d3d3;
`;

export default ChatList;

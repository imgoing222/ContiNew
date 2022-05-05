import styled from "styled-components";

function ChatListitem() {
	return (
		<Container>
			<Textarea name="content" cols={20} readOnly></Textarea>
		</Container>
	);
}

const Container = styled.div``;

const Textarea = styled.textarea`
	font-size: 2rem;
	border: solid 1px #d3d3d3;
	resize: none;
	border-radius: 10px;
`;

export default ChatListitem;

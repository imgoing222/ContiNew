import styled from "styled-components";

import ChatList from "@components/chat/ChatList";

const DUMMY_DATA = [
	{
		chatId: 1,
		sellerNickname: "김싸피",
		buyerNickname: "이싸피",
		lastContent: "화장실 사진 좀 찍어주세요.",
		updatedAt: "2022-04-20 14:22:04"
	},
	{
		chatId: 2,
		sellerNickname: "박싸피",
		buyerNickname: "유싸피",
		lastContent: "화장실 사진 좀 찍어주세요.",
		updatedAt: "2022-04-19 18:58:22"
	},
	{
		chatId: 3,
		sellerNickname: "조싸피",
		buyerNickname: "이싸피",
		lastContent: "화장실 사진 좀 찍어주세요.",
		updatedAt: "2022-04-19 08:02:39"
	}
];

function ChatPage() {
	return (
		<Container>
			<ChatList />
		</Container>
	);
}

const Container = styled.div`
	height: 70vh;
	display: flex;
	align-items: center;
	margin: 10rem;
	border: solid 2px #d3d3d3;
`;

export default ChatPage;

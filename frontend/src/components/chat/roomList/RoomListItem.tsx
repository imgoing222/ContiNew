import { useSelector } from "react-redux";
import { RootState } from "src/store";
import styled from "styled-components";

interface ChatProps {
	chat: {
		buyer: string;
		last_message: string;
		last_message_time: string;
		room_id: string;
		sale: number;
		seller: string;
		main_image: string;
	};
}

function RoomListItem({ chat }: ChatProps) {
	const { username } = useSelector((state: RootState) => state.userInfo);
	let name = "";
	if (username === chat.buyer) {
		name = chat.seller;
	} else {
		name = chat.buyer;
	}

	return (
		<Container>
			<LeftSection>
				<MainImage src={chat.main_image} alt="Img" />
			</LeftSection>
			<RightSection>
				<h1>{name}</h1>
				<Text>{chat.last_message}</Text>
			</RightSection>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	border-bottom: solid 1px #d3d3d3;

	&:hover {
		background-color: #fffafa;
	}
`;

const LeftSection = styled.div`
	width: 10rem;
	display: flex;
	flex-direction: column;
	border-radius: 20%;
	overflow: hidden;
`;

const RightSection = styled.div`
	width: 20rem;
	display: flex;
	margin: 1rem;
	flex-direction: column;
`;

const MainImage = styled.img`
	width: 100%;
	max-height: 6rem;
`;

const Text = styled.div`
	width: 10rem;
	font-size: 1.5rem;
	color: #a9a9a9;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

export default RoomListItem;

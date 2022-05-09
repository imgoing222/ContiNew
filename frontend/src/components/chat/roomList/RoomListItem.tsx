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
	};
}

function RoomListItem({ chat }: ChatProps) {
	const { login_id } = useSelector((state: RootState) => state.userInfo);
	let name = "";
	if (login_id === chat.buyer) {
		name = chat.seller;
	} else {
		name = chat.buyer;
	};

	return (
		<Container>
			<LeftSection>
				<h3>{name}</h3>
				<div>{chat.last_message}</div>
			</LeftSection>
			<RightSection>
				<div>Img</div>
				<div>시간</div>
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
`;

const LeftSection = styled.div`
	display: flex;
	flex: 7;
	flex-direction: column;
`;

const RightSection = styled.div`
	display: flex;
	flex: 3;
	flex-direction: column;
	align-items: center;
`;

export default RoomListItem;

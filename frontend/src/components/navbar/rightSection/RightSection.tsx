import styled from "styled-components";

import { ChatIcon, UserIcon, LogOutIcon } from "./index";

function RightSection() {
	return (
		<Container>
			<ChatIcon />
			<UserIcon />
			<LogOutIcon />
		</Container>
	);
}

const Container = styled.div`
	width: 20%;
	display: flex;
	justify-content: end;
	align-items: center;
`;

export default RightSection;

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
	display: flex;
	align-items: center;
`;

export default RightSection;

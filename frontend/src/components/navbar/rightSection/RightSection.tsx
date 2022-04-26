import styled from "styled-components";

import { ChatIcon, UserIcon } from "./index";

function RightSection() {
	return (
		<Container>
			<ChatIcon />
			<UserIcon />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
`;

export default RightSection;

import styled from "styled-components";

import { AlertIcon, UserIcon } from "./index";

function RightSection() {
	return (
		<Container>
			<AlertIcon />
			<UserIcon />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
`;

export default RightSection;

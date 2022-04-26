import styled from "styled-components";
import AlertIcon from "./AlertIcon";
import UserIcon from "./UserIcon";

function RightSection() {
  return(
    <Container>
			<AlertIcon />
			<UserIcon />
		</Container>
  )
}

const Container = styled.div`
	display: flex;
	align-items: center;
`;

export default RightSection;
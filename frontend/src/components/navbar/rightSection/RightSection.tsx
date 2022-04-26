import styled from "styled-components";
import Alert from "./Alert";

function RightSection() {
  return(
    <Container>
			<Alert />
			<div>프로필</div>
			<div>로그아웃</div>
		</Container>
  )
}

const Container = styled.div`
	display: flex;
	align-items: center;
`;

export default RightSection;
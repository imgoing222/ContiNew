import styled from "styled-components";
import AlertIcon from "./AlertIcon";

function RightSection() {
  return(
    <Container>
			<AlertIcon />
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
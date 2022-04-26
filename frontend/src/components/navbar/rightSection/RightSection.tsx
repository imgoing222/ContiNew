import styled from "styled-components";

function RightSection() {
  return(
    <Container>
			<div>채팅</div>
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
import styled from "styled-components";

function Footer() {
	return (
		<Container>
			<SubContainer>
				<Content>(주)SSAFY6</Content>
				<Content>상호: ContiNew</Content>
				<Content>대표: 우팀장</Content>
				<Content>사업자 번호: 123-45-678910</Content>
				<Content>주소: 서울 강남구 밤고개로 99</Content>
			</SubContainer>
		</Container>
	);
}

const Container = styled.footer`
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #696969;
`;

const SubContainer = styled.div`
	display: flex;
	flex-direction: column;
  margin: 1rem
`;

const Content = styled.p`
	font-size: 1rem;
	color: #d3d3d3;
	margin: 0;
`;

export default Footer;

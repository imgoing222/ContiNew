import styled from "styled-components";

function Navbar() {
	return (
		<Nav>
			<Section>
				<div>지도</div>
				<div>방내놓기</div>
			</Section>
			<Section>
				<div>채팅</div>
				<div>프로필</div>
				<div>로그아웃</div>
			</Section>
		</Nav>
	);
}

const Nav = styled.nav`
	width: 100%;
	height: 5rem;
	display: flex;
  align-items: center;
  justify-content: space-between;
	border-bottom: 1px solid black;
`;

const Section = styled.section`
	display: flex;
`;

export default Navbar;

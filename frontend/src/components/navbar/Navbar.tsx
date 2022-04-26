import styled from "styled-components";

function Navbar() {
	return (
		<Nav>
			<div>지도</div>
			<div>방내놓기</div>
			<div>채팅</div>
			<div>프로필</div>
			<div>로그아웃</div>
		</Nav>
	);
}

const Nav = styled.nav`
	width: 100%;
	height: 10rem;
	display: flex;
	border-bottom: 1px solid black;
`;

export default Navbar;

import styled from "styled-components";

import { LeftSection, RightSection } from "@components/navbar";

function Navbar() {
	return (
		<Nav>
			<LeftSection />
      <h1>ContiNew</h1>
			<RightSection />
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

export default Navbar;

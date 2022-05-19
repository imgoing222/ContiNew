import Link from "next/link";
import styled from "styled-components";

import { LeftSection, RightSection } from "@components/navbar";

function Navbar() {
	return (
		<Nav>
			<LeftSection />
			<Link href="/" passHref>
				<Title>ContiNew</Title>
			</Link>
			<RightSection />
		</Nav>
	);
}

const Nav = styled.nav`
	width: 100%;
	height: 6rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const Title = styled.a`
	font-size: 3.5rem;
	color: #dc143c;
	font-weight: bold;
`;

export default Navbar;

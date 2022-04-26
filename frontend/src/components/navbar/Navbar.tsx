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
	height: 5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid black;
`;

const Title = styled.a`
	font-size: 3.5rem;
	color: #dc143c;
`;

export default Navbar;

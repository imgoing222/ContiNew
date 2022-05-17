import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import MenuItem from "./MenuItem";

function LeftSection() {
	const menu = [
		{ id: 1, name: "지도", address: "/saleList" },
		{ id: 2, name: "방내놓기", address: "/createSale" },
		{ id: 3, name: "계약", address: "/contract/1" },
	];

	return (
		<Container>
			{menu.map((item) => (
				<MenuItem key={item.id} item={item} />
			))}
			<MenuBars icon={faBars} />
		</Container>
	);
}

const Container = styled.ul`
	width: 20%;
	display: flex;
	align-items: center;

	@media ${(props) => props.theme.tabletS} {
		flex-direction: column;
	}
`;

const MenuBars = styled(FontAwesomeIcon)`
	display: none;
	font-size: 2.5rem;
	cursor: pointer;
	margin-left: 2rem;
	margin-right: auto;
	@media ${(props) => props.theme.tabletS} {
		display: block;
	}
`;

export default LeftSection;

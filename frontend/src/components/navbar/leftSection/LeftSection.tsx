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
		</Container>
	);
}

const Container = styled.ul`
	width: 20%;
	display: flex;
	align-items: center;
`;

export default LeftSection;

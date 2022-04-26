import styled from "styled-components";

import MenuItem from "./MenuItem";

function LeftSection() {
	const menu = [
		{ id: 1, name: "지도", address: "/" },
		{ id: 2, name: "방내놓기", address: "/" },
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
	display: flex;
	align-items: center;
`;

export default LeftSection;

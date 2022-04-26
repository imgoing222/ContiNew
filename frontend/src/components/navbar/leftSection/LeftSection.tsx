import styled from "styled-components";

import MenuItem from "./MenuItem";

function LeftSection() {
	const menu = [
		{ name: "지도", address: "/"},
		{ name: "방내놓기", address: "/"},
	];

	return (
		<Container>
			{menu.map((item) => (
				<MenuItem item={item} />
			))}
		</Container>
	);
}

const Container = styled.ul`
	display: flex;
	align-items: center;
`;

export default LeftSection;

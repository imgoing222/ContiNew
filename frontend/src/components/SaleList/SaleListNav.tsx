import React from "react";
import styled from "styled-components";
import SearchInput from "./SearchInput";

export interface RefProps {
	kakaoMap: React.MutableRefObject<HTMLElement | null>;
}

function SaleListNav({ kakaoMap }: RefProps) {
	return (
		<Nav>
			<SearchInput kakaoMap={kakaoMap} />
		</Nav>
	);
}

export default SaleListNav;

const Nav = styled.nav`
	min-width: 100vw;
	display: flex;
`;

import { MapRefType } from "src/pages/saleList";
import styled from "styled-components";
import Options from "./Options";
import Period from "./Period";
import PriceTab from "./PriceTab";
import SearchInput from "./SearchInput";

function SaleListNav({ kakaoMap }: MapRefType) {
	return (
		<Nav>
			<SearchInput kakaoMap={kakaoMap} />
			<PriceTab />
			<Period />
			<Options />
		</Nav>
	);
}

export default SaleListNav;

const Nav = styled.nav`
	display: flex;
	border: 1px solid ${(props) => props.theme.borderColor};
	border-left: none;
	border-right: none;
`;

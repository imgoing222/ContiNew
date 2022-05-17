import { useRef } from "react";
import styled from "styled-components";

import SearchInput from "@components/saleList/SearchInput";

export interface MapRefType {
	kakaoMap: React.MutableRefObject<kakao.maps.Map>;
}

function SearchSection() {
	const kakaoMap = useRef<kakao.maps.Map>();
	return (
		<Section>
			<SearchBox>
				<SearchInput kakaoMap={kakaoMap as React.MutableRefObject<kakao.maps.Map>} />
			</SearchBox>
		</Section>
	);
}

const Section = styled.section`
	height: 60rem;
	background: url("/background2.webp");
	background-size: 100% 100%;
	background-repeat: no-repeat;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SearchBox = styled.div`
	width: 40rem;
	height: 5rem;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	background-color: #ffffff;

	@media ${(props) => props.theme.mobile} {
		width: 27rem;
	}

	@media ${(props) => props.theme.mobileXS} {
		width: 13rem;
		height: 4rem;
	}
`;

export default SearchSection;

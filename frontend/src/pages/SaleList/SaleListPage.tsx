import Map from "@components/SaleList/Map";
import SaleList from "@components/SaleList/SaleList";
import SaleListNav from "@components/SaleList/SaleListNav";
import React, { useRef } from "react";
import styled from "styled-components";

export interface MapRefType {
	kakaoMap: React.MutableRefObject<kakao.maps.Map>;
}

function SaleListPage() {
	const kakaoMap = useRef<kakao.maps.Map>();
	return (
		<>
			<SaleListNav kakaoMap={kakaoMap} />
			<Container>
				<SaleList />
				<Map kakaoMap={kakaoMap} />
			</Container>
		</>
	);
}
export default SaleListPage;

const Container = styled.div`
	display: flex;
`;

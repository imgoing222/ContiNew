import Map from "@components/saleList/Map";
import SaleList from "@components/saleList/SaleList";
import SaleListNav from "@components/saleList/SaleListNav";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

export interface MapRefType {
	kakaoMap: React.MutableRefObject<kakao.maps.Map>;
}

function index() {
	const kakaoMap = useRef<kakao.maps.Map>();

	return (
		<>
			<SaleListNav kakaoMap={kakaoMap as React.MutableRefObject<kakao.maps.Map>} />
			<Container>
				<SaleList />
				<Map kakaoMap={kakaoMap as React.MutableRefObject<kakao.maps.Map>} />
			</Container>
		</>
	);
}
export default index;

const Container = styled.div`
	display: flex;
`;

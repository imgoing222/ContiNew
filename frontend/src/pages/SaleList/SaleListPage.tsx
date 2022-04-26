import Map from "@components/SaleList/Map";
import SaleList from "@components/SaleList/SaleList";
import SaleListNav from "@components/SaleList/SaleListNav";
import React, { useRef } from "react";
import styled from "styled-components";

function SaleListPage() {
	const kakaoMap = useRef<HTMLElement | null>(null);
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

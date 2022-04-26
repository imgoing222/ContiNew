import React, { useEffect, useState } from "react";
import { MapRefType } from "src/pages/SaleList/SaleListPage";
import styled from "styled-components";

function SaleList({ kakaoMap }: MapRefType) {
	const [zoomLevel, setZoomLevel] = useState(0);
	useEffect(() => {
		const level = kakaoMap.current.getLevel();
		setZoomLevel(level);
		console.log(level);
	}, [zoomLevel]);
	return <Container></Container>;
}

export default SaleList;

const Container = styled.section`
	min-width: 38rem;
	border: 1px solid #000;
	display: flex;
	flex-direction: column;
`;

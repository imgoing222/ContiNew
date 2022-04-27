import { useEffect, useState } from "react";
import { MapRefType } from "src/pages/SaleList/SaleListPage";
import styled from "styled-components";

function SaleList() {
	const [zoomLevel, setZoomLevel] = useState(0);

	return <Container></Container>;
}

export default SaleList;

const Container = styled.section`
	min-width: 38rem;
	border: 1px solid #000;
	display: flex;
	flex-direction: column;
`;

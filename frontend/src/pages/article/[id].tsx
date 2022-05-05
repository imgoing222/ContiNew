import PriceInfo from "@components/article/PriceInfo";
import React from "react";
import styled from "styled-components";

function index() {
	return (
		<Container>
			<SaleInfo>
				<PriceInfo />
			</SaleInfo>
			<Card></Card>
		</Container>
	);
}

export default index;

const Container = styled.div`
	width: 120rem;
	display: flex;
	margin: 0 auto;
`;

const SaleInfo = styled.div`
	width: 78rem;
`;

const Card = styled.div`
	width: 46rem;
`;

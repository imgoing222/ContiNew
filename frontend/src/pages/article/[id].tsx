import CardDescription from "@components/article/CardDescription";
import Description from "@components/article/Description";
import LocationInfo from "@components/article/LocationInfo";
import OptionInfo from "@components/article/OptionalInfo";
import PriceInfo from "@components/article/PriceInfo";
import React from "react";
import styled from "styled-components";

function index() {
	return (
		<Container>
			<SaleInfo>
				<PriceInfo />
				<OptionInfo />
				<LocationInfo />
				<Description />
			</SaleInfo>
			<Card>
				<CardDescription />
			</Card>
		</Container>
	);
}

export default index;

const Container = styled.div`
	width: 120rem;
	display: flex;
	margin: 0 auto;
	justify-content: space-between;
`;

const SaleInfo = styled.div`
	width: 78rem;
`;

const Card = styled.div`
	width: 46rem;
	display: flex;
	flex-direction: row-reverse;
`;

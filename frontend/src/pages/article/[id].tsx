import CardDescription from "@components/article/CardDescription";
import Description from "@components/article/Description";
import LocationInfo from "@components/article/LocationInfo";
import OptionInfo from "@components/article/OptionalInfo";
import Photos from "@components/article/Photos";
import PriceInfo from "@components/article/PriceInfo";
import React from "react";
import styled from "styled-components";

function index() {
	return (
		<Div>
			<Photos />
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
		</Div>
	);
}

export default index;

const Container = styled.div`
	display: flex;
`;
const Div = styled.div`
	width: 120rem;
	margin: 4rem auto;
	display: flex;
	flex-direction: column;
`;

const SaleInfo = styled.div`
	width: 78rem;
`;

const Card = styled.div`
	width: 46rem;
	display: flex;
	flex-direction: row-reverse;
`;

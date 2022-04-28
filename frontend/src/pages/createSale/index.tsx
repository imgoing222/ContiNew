import { Container } from "@components/account/Container";
import SaleInfo from "@components/createSale/SaleInfo";
import React, { useState } from "react";
import { HouseInfo } from "src/types/houseInfo";
import styled from "styled-components";

export interface EventProps {
	changeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
	checked: HouseInfo;
}

function index() {
	const [houseInfo, setHouseInfo] = useState<HouseInfo>({
		sidoName: "",
		gunguName: "",
		dongName: "",
		jibunAddress: "",
		addressDetail: "",
		latitude: 0,
		longitude: 0,
		floor: 0,
		saleType: "",
		houseType: "",
		deposit: 0,
		monthlyRent: 0,
		maintenanceFee: 0,
		maintenanceDetail: "",
		period: 0,
		description: "",
		option: [],
	});

	const handleHouseInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
		setHouseInfo({ ...houseInfo, [event.target.name]: event.target.value });
	};
	return (
		<Container>
			<SaleInfo checked={houseInfo} changeEvent={handleHouseInfo} />
		</Container>
	);
}

export default index;

const Conatiner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-width: 120rem;
`;

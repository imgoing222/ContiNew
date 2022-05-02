import PriceInfo from "@components/createSale/PriceInfo";
import SaleInfo from "@components/createSale/SaleInfo";
import React, { useState } from "react";
import { HouseInfo } from "src/types/houseInfo";
import styled from "styled-components";
import Head from "next/head";
import OptionInfo from "@components/createSale/OptionInfo";
import LocationInfo from "@components/createSale/LocationInfo";
import Description from "@components/createSale/Description";
import Photos from "@components/createSale/Photos";

interface ButtonProps {
	isApplyBtn?: boolean;
}

export interface EventProps {
	changeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
	houseInfo: HouseInfo;
	setHouseInfo?: React.Dispatch<React.SetStateAction<HouseInfo>>;
}

const numberKey = ["deposit", "monthlyRent", "maintenanceFee", "period", "floor"];

function index() {
	const [houseInfo, setHouseInfo] = useState<HouseInfo>({
		sido: "",
		sigungu: "",
		bname: "",
		jibunAddress: "",
		addressDetail: "",
		latitude: 0,
		longitude: 0,
		floor: "",
		saleType: "",
		houseType: "",
		monthlyRent: "",
		maintenanceFee: "",
		maintenanceDetail: "",
		period: "",
		description: "",
		options: [],
		deposit: "",
		images: null,
	});

	const handleHouseInfo = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		console.log(houseInfo);
		if (event.target.name === "options") {
			const idx = houseInfo.options.indexOf(event.target.value);
			if (idx !== -1) {
				return setHouseInfo({ ...houseInfo, ...[houseInfo.options.splice(idx, 1)] });
			}
			setHouseInfo({ ...houseInfo, ...[houseInfo.options.push(event.target.value)] });
			return;
		}
		if (numberKey.includes(event.target.name)) {
			return setHouseInfo({
				...houseInfo,
				[event.target.name]: event.target.value.replace(/\D/, ""),
			});
		}
		setHouseInfo({ ...houseInfo, [event.target.name]: event.target.value });
	};
	return (
		<>
			<Head>
				<title>매물 등록</title>
			</Head>
			<Container>
				<SaleInfo houseInfo={houseInfo} changeEvent={handleHouseInfo} />
				<PriceInfo houseInfo={houseInfo} changeEvent={handleHouseInfo} />
				<OptionInfo houseInfo={houseInfo} changeEvent={handleHouseInfo} />
				<LocationInfo
					houseInfo={houseInfo}
					changeEvent={handleHouseInfo}
					setHouseInfo={setHouseInfo}
				/>
				<Photos houseInfo={houseInfo} changeEvent={handleHouseInfo} />
				<Description houseInfo={houseInfo} changeEvent={handleHouseInfo} />
				<Div>
					<Button>취소</Button>
					<Button isApplyBtn={true}>매물 등록</Button>
				</Div>
			</Container>
		</>
	);
}

export default index;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	width: 120rem;
`;

const Button = styled.button<ButtonProps>`
	width: 12rem;
	height: 4rem;
	border: none;
	margin-right: 2rem;
	background-color: ${(props) => props.isApplyBtn && props.theme.mainColor};
	color: ${(props) => props.isApplyBtn && "#fff"};
`;

const Div = styled.div`
	display: flex;
	justify-content: center;
`;

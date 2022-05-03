import {
	PriceInfo,
	SaleInfo,
	OptionInfo,
	LocationInfo,
	Description,
	Photos,
} from "@components/createSale";
import React, { useState } from "react";
import { HouseInfo } from "src/types/houseInfo";
import styled from "styled-components";
import Head from "next/head";
import { saleApi } from "src/api";

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

	const {
		sido,
		sigungu,
		bname,
		jibunAddress,
		addressDetail,
		latitude,
		longitude,
		floor,
		saleType,
		houseType,
		monthlyRent,
		maintenanceFee,
		maintenanceDetail,
		period,
		description,
		options,
		deposit,
		images,
	} = houseInfo;

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

	const onSubmit = () => {
		const formData = new FormData();
		const optionList = options.map((option) => +option);
		const article = {
			sido_name: sido,
			gungu_name: sigungu,
			dong_name: bname,
			jibun_address: jibunAddress,
			address_detail: addressDetail,
			latitude,
			longitude,
			floor: +floor,
			sale_type: saleType,
			house_type: houseType,
			deposit: +deposit,
			monthly_rent: +monthlyRent,
			maintenance_fee: +maintenanceFee,
			maintenance_detail: maintenanceDetail,
			period: +period,
			description,
			options: optionList,
		};

		formData.append("house", new Blob([JSON.stringify(article)], { type: "application/json" })),
			images !== null
				? [...images].forEach((file) => formData.append("images", file))
				: formData.append("images", new Blob([]));
		saleApi.createSale(formData);
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
				<Photos houseInfo={houseInfo} changeEvent={handleHouseInfo} setHouseInfo={setHouseInfo} />
				<Description houseInfo={houseInfo} changeEvent={handleHouseInfo} />
				<Div>
					<Button>취소</Button>
					<Button isApplyBtn={true} onClick={onSubmit}>
						매물 등록
					</Button>
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
	cursor: pointer;
`;

const Div = styled.div`
	display: flex;
	justify-content: center;
`;

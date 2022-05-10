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
import checkData from "@utils/checkDataBeforeSumit";
import createFormData from "@utils/createFormData";

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
		saleType: "",
		houseType: "",
		contractType: "",
		deposit: "",
		monthlyRent: "",
		maintenanceFee: "",
		maintenanceDetail: "",
		period: "",
		options: [],
		jibunAddress: "",
		addressDetail: "",
		floor: "",
		images: null,
		description: "",
		sido: "",
		sigungu: "",
		bname: "",
		latitude: 0,
		longitude: 0,
		agreement: "",
	});

	const {
		saleType,
		sido,
		sigungu,
		bname,
		jibunAddress,
		addressDetail,
		latitude,
		longitude,
		floor,
		houseType,
		monthlyRent,
		maintenanceFee,
		maintenanceDetail,
		period,
		description,
		options,
		deposit,
		images,
		contractType,
	} = houseInfo;

	const handleOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === "options") {
			const idx = houseInfo.options.indexOf(e.target.value);
			if (idx !== -1) {
				return setHouseInfo({ ...houseInfo, ...[houseInfo.options.splice(idx, 1)] });
			}
			setHouseInfo({ ...houseInfo, ...[houseInfo.options.push(e.target.value)] });
			return;
		}
	};

	const onlyNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		return setHouseInfo({
			...houseInfo,
			[e.target.name]: e.target.value.replace(/\D/, ""),
		});
	};

	const handleHouseInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === "options") return handleOptions(e);
		if (numberKey.includes(e.target.name)) return onlyNumber(e);
		setHouseInfo({ ...houseInfo, [e.target.name]: e.target.value });
	};

	const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (checkData(houseInfo) && houseInfo.agreement === "agree") {
			saleApi.createSale(createFormData(houseInfo));
		}
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
				<Description
					houseInfo={houseInfo}
					changeEvent={handleHouseInfo}
					setHouseInfo={setHouseInfo}
				/>
				<Div>
					<AgreementText>다음의 약관을 읽고 동의함 </AgreementText>
					<RadioText>동의</RadioText>
					<InputRadio type="radio" name="agreement" onChange={handleHouseInfo} value="agree" />
					<RadioText>비동의</RadioText>
					<InputRadio type="radio" name="agreement" onChange={handleHouseInfo} value="disagree" />
				</Div>
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

const Container = styled.form`
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
	align-items: center;
	margin-bottom: 4rem;
`;

const AgreementText = styled.p`
	font-size: 1.5rem;
	margin-right: 1rem;
`;

const RadioText = styled.p`
	font-size: 1.2rem;
`;

const InputRadio = styled.input`
	margin-right: 1.5rem;
`;

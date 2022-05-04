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
import { toast } from "react-toastify";

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

	const handleHouseInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(houseInfo);
		if (e.target.name === "options") {
			const idx = houseInfo.options.indexOf(e.target.value);
			if (idx !== -1) {
				return setHouseInfo({ ...houseInfo, ...[houseInfo.options.splice(idx, 1)] });
			}
			setHouseInfo({ ...houseInfo, ...[houseInfo.options.push(e.target.value)] });
			return;
		}
		if (numberKey.includes(e.target.name)) {
			return setHouseInfo({
				...houseInfo,
				[e.target.name]: e.target.value.replace(/\D/, ""),
			});
		}
		setHouseInfo({ ...houseInfo, [e.target.name]: e.target.value });
	};

	const checkData = () => {
		const msg = {
			saleType: "매물정보를 선택해주세요",
			houseType: "매물 종류를 선택해주세요",
			contractType: "계약 정보를 선택해주세요",
			deposit: "금액을 입력해주세요",
			monthlyRent: "월세를 입력해주세요",
			maintenanceFee: "관리비를 입력해주세요",
			maintenanceDetail: "관리비 포함 항목을 입력해주세요",
			period: "임대기간을 입력해주세요",
			jibunAddress: "주소를 입력해주세요",
			addressDetail: "상세주소를 입력해주세요",
			floor: "층수를 입력해주세요",
			images: "사진을 업로드해주세요",
			description: "상세설명을 입력해주세요",
		};
		const keys = Object.keys(houseInfo);

		for (const k of keys) {
			if (houseInfo.contractType === "전세" && k === "monthlyRent") continue;
			if (k === "images" && houseInfo.images && houseInfo.images?.length < 3) {
				toast.warning("사진을 최소 3장 업로드해주세요");
				return false;
			}
			if (!houseInfo[k as keyof HouseInfo]) {
				toast.warning(msg[k as keyof typeof msg]);
				return false;
			}
		}
		return true;
	};

	const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (checkData() && houseInfo.agreement === "agree") {
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
				contract_type: contractType,
			};

			formData.append("house", new Blob([JSON.stringify(article)], { type: "application/json" })),
				images !== null
					? [...images].forEach((file) => formData.append("images", file))
					: formData.append("images", new Blob([]));
			saleApi.createSale(formData);
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

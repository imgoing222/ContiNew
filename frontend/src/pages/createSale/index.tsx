import {
	PriceInfo,
	SaleInfo,
	OptionInfo,
	LocationInfo,
	Description,
	Photos,
} from "@components/createSale";
import React, { useEffect, useState } from "react";
import HouseInfo from "src/types/houseInfo";
import styled from "styled-components";
import Head from "next/head";
import { saleApi } from "src/api";
import { checkData, createFormData, getArticleData } from "@utils/index";
import { useRouter } from "next/router";
import snakeToCamel from "@utils/snakeToCamel";
import articleApi from "src/api/article";
import { toast } from "react-toastify";

interface ButtonProps {
	isApplyBtn?: boolean;
}

export interface EventProps {
	changeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
	houseInfo: HouseInfo;
	setHouseInfo?: React.Dispatch<React.SetStateAction<HouseInfo>>;
}

export interface TextAreaProps {
	changeEvent: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	houseInfo: HouseInfo;
	setHouseInfo?: React.Dispatch<React.SetStateAction<HouseInfo>>;
}

const numberKey = ["deposit", "monthlyRent", "maintenanceFee", "period", "floor"];

function index() {
	const router = useRouter();
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
		sidoName: "",
		gunguName: "",
		dongName: "",
		latitude: 0,
		longitude: 0,
		agreement: "",
	});

	useEffect(() => {
		const setData = async () => {
			if (router.query.id) {
				const data = await getArticleData(+router.query.id as number);
				setHouseInfo(snakeToCamel(data, "modified") as HouseInfo);
			}
		};

		setData();
	}, []);

	const handleOptions = (e: React.ChangeEvent<HTMLInputElement>) => {
		const idx = houseInfo.options.indexOf(+e.target.value);
		if (idx !== -1) {
			const deleteOption = houseInfo.options.slice().filter((i) => i !== +e.target.value);
			return setHouseInfo({ ...houseInfo, options: deleteOption });
		}
		const addOptions = houseInfo.options.slice();
		addOptions.push(+e.target.value);
		setHouseInfo({ ...houseInfo, options: addOptions });
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
	const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setHouseInfo({ ...houseInfo, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (checkData(houseInfo) && houseInfo.agreement === "agree") {
			const res = await saleApi.createSale(createFormData(houseInfo));
			if (res === "H03") return toast.error("1인당 1개의 매물만 올릴 수 있습니다.");
			if (typeof res !== "string") window.location.replace(`/article/${res.data.house_id}`);
		}
	};

	const editSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (checkData(houseInfo) && houseInfo.agreement === "agree") {
			if (router.query.id) {
				const res = await articleApi.editArticle(createFormData(houseInfo), +router.query.id);
				if (res.status === 204) window.location.replace(`/article/${router.query.id}`);
			}
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
					changeEvent={handleTextArea}
					setHouseInfo={setHouseInfo}
				/>
				<Div>
					<StyledSpan
						onClick={() => window.open("/agreement", "이용약관", "width=500px, height=500px")}
					>
						다음의 약관
					</StyledSpan>
					<AgreementText>을 읽고 동의하십니까?</AgreementText>
					<RadioText>동의</RadioText>
					<InputRadio type="radio" name="agreement" onChange={handleHouseInfo} value="agree" />
					<RadioText>비동의</RadioText>
					<InputRadio type="radio" name="agreement" onChange={handleHouseInfo} value="disagree" />
				</Div>
				<Div>
					<Button onClick={() => router.back()}>취소</Button>
					{router.query.id ? (
						<Button isApplyBtn={true} onClick={editSubmit}>
							수정 하기
						</Button>
					) : (
						<Button isApplyBtn={true} onClick={onSubmit}>
							매물 등록
						</Button>
					)}
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
	@media ${(props) => props.theme.tabletS} {
		width: auto;
	}
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
	font-weight: 300;
`;

const RadioText = styled.p`
	font-size: 1.2rem;
`;

const InputRadio = styled.input`
	margin-right: 1.5rem;
`;

const StyledSpan = styled.span`
	font-weight: bold;
	cursor: pointer;
	font-size: 1.5rem;
	text-decoration: underline;
`;

import { ChangeEvent, useState } from "react";
import {
	setContractType,
	setDeposit,
	setMaintenanceFee,
	setMonthlyRent,
} from "src/store/searchFilter";
import styled from "styled-components";
import Container from "./Container";
import Slider from "./Slider";
import { useDispatch } from "react-redux";

function PriceTab() {
	const dispatch = useDispatch();
	const [contractTypes, setContractTypes] = useState("전체");
	const changeContractTypeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { value, id } = e.target;
		if (id === "전세" && contractTypes === "") {
			setContractTypes("전세");
			return chagneRedux("전세");
		}
		if (id === "월세" && contractTypes === "") {
			setContractTypes("월세");
			return chagneRedux("월세");
		}
		if (id === "월세" && contractTypes === "전세") {
			setContractTypes("전체");
			return chagneRedux("");
		}
		if (id === "전세" && contractTypes === "월세") {
			setContractTypes("전체");
			return chagneRedux("");
		}
		if (id === "월세" && contractTypes === "전체") {
			setContractTypes("전세");
			return chagneRedux("전세");
		}
		if (id === "전세" && contractTypes === "전체") {
			setContractTypes("월세");
			return chagneRedux("월세");
		}
	};

	const chagneRedux = (str: string) => {
		dispatch(setContractType({ contractType: str }));
	};
	return (
		<Container title="거래 유형 / 가격">
			<SmallBox>
				<Title>거래 유형</Title>
				<Tab>
					<InputBox>
						<Input
							type="checkbox"
							id="월세"
							onChange={changeContractTypeHandler}
							checked={contractTypes === "전체" || contractTypes === "월세"}
						/>
						<Label htmlFor="월세" style={{ cursor: "pointer" }}>
							월세
						</Label>
					</InputBox>
					<InputBox>
						<Input
							type="checkbox"
							id="전세"
							style={{ cursor: "pointer" }}
							onChange={changeContractTypeHandler}
							checked={contractTypes === "전체" || contractTypes === "전세"}
						/>
						<Label htmlFor="전세">전세</Label>
					</InputBox>
				</Tab>
			</SmallBox>
			<SmallBox>
				<Slider
					title="가격"
					maxMin={{ min: 0, max: 10000 }}
					subTitle="보증금 / 전세금"
					itemName="Deposit"
					setChange={setDeposit}
				/>
			</SmallBox>
			<SmallBox>
				<Slider
					maxMin={{ min: 0, max: 300 }}
					subTitle="월세"
					itemName="MonthlyRent"
					setChange={setMonthlyRent}
				/>
			</SmallBox>
			<SmallBox>
				<Slider
					maxMin={{ min: 0, max: 50 }}
					subTitle="관리비"
					itemName="MaintenanceFee"
					setChange={setMaintenanceFee}
				/>
			</SmallBox>
		</Container>
	);
}

export default PriceTab;

const Title = styled.h1`
	font-size: 2rem;
	margin-bottom: 2rem;
`;

const Tab = styled.div`
	display: flex;
	margin-bottom: 2rem;
`;

const InputBox = styled.div`
	display: flex;
	align-items: center;
`;

const Input = styled.input`
	font-size: 1.4rem;
`;

const Label = styled.label`
	font-size: 1.4rem;
	margin-left: 0.5rem;
	margin-right: 5rem;
`;

const SmallBox = styled.div`
	margin-bottom: 2rem;
	&::after {
		content: "";
		display: block;
		border: ${(props) => `0.05rem solid rgba(233, 233, 233,0.4)}`};
		width: 100%;
		margin-top: 2rem;
	}
`;

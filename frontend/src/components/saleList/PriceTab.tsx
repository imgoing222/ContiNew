import { useState } from "react";
import styled from "styled-components";
import Container from "./Container";
import Slider from "./Slider";

function PriceTab() {
	return (
		<Container title="거래 유형 / 가격">
			<SmallBox>
				<Title>거래 유형</Title>
				<Tab>
					<InputBox>
						<Input type="checkbox" id="월세" />
						<Label htmlFor="월세" style={{ cursor: "pointer" }}>
							월세
						</Label>
					</InputBox>
					<InputBox>
						<Input type="checkbox" id="전세" style={{ cursor: "pointer" }} />
						<Label htmlFor="전세">전세</Label>
					</InputBox>
				</Tab>
			</SmallBox>
			<SmallBox>
				<Slider
					title="가격"
					step={5}
					maxMin={{ min: 0, max: 100 }}
					subTitle="보증금 / 전세금"
					unit="만원"
				/>
			</SmallBox>
			<SmallBox>
				<Slider step={5} maxMin={{ min: 0, max: 100 }} subTitle="월세" unit="가격" />
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

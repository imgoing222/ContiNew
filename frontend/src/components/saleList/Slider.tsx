import React, { InputHTMLAttributes, useState } from "react";
import styled from "styled-components";
import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
import { actionProps } from "src/store/searchFilter";
import { RootState } from "src/store";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	title?: string;
	maxMin: { min: number; max: number };
	subTitle?: string;
	setChange: (data: actionProps) => {
		type: string;
		data: actionProps;
	};
	itemName?: string;
}

interface RangeValue {
	min: number;
	max: number;
}

interface RangeProps {
	color?: string;
}

function Slider({ title, subTitle, maxMin, setChange, itemName }: Props) {
	const searchCondition = useSelector((state: RootState) => state.searchFilter);
	const dispatch = useDispatch();
	const [localMin, setLocalMin] = useState(searchCondition[`min${itemName}`] as number);
	const [localMax, setLocalMax] = useState(searchCondition[`max${itemName}`] as number);

	const onChangeHandler = (value: RangeValue) => {
		const { min, max } = value;
		setLocalMin(Math.max(min, maxMin.min));
		setLocalMax(Math.min(max, maxMin.max));
	};

	const changeReduxHandler = () => {
		dispatch(setChange({ min: localMin, max: localMax }));
	};

	const changeMoneyRange = (money: number) => {
		if (money === 0) return 0;
		if (subTitle === "월세" && money === 300) return "무제한";
		if (subTitle === "보증금 / 전세금" && money === 10000) return "무제한";
		if (subTitle === "관리비" && money === 50) return "무제한";
		return `${money} 만원`;
	};

	const setStep = () => {
		if (subTitle === "보증금 / 전세금") {
			if (localMin <= 500 || localMax <= 500) return 100;
			return 500;
		}
		if (subTitle === "월세") return 5;
		if (subTitle === "관리비") {
			if (localMin <= 30) return 1;
			return 2;
		}
	};

	return (
		<>
			<Title>{title}</Title>

			<Description>
				<Range>{subTitle}</Range>

				<Range color="red">
					{changeMoneyRange(localMin)} ~ {changeMoneyRange(localMax)}
				</Range>
			</Description>

			<Form>
				<InputRange
					draggableTrack
					formatLabel={(value) => `${value}`}
					maxValue={maxMin.max}
					minValue={maxMin.min}
					step={setStep()}
					value={{ min: localMin, max: localMax }}
					onChange={(value) => {
						onChangeHandler(value as RangeValue);
					}}
					onChangeComplete={() => changeReduxHandler()}
				/>
			</Form>
		</>
	);
}

export default Slider;

const Description = styled.div`
	margin: 1rem 0 3rem 0;
	display: flex;
	justify-content: space-between;
`;

const Title = styled.h1`
	font-size: 2rem;
`;

const Range = styled.span<RangeProps>`
	display: block;
	font-size: 1.5rem;
	color: ${(props) => (props.color === "red" ? props.theme.mainColor : "rgba(0,0,0,0.7)")};
	text-align: right;
`;

const Form = styled.form`
	width: 38rem;
	margin: 0 auto;
	margin-bottom: 3.5rem;
	@media ${(props) => props.theme.tabletS} {
		width: 35rem;
	}
	@media ${(props) => props.theme.mobile} {
		width: 30rem;
	}
	@media ${(props) => props.theme.mobileS} {
		width: 26rem;
	}
	@media ${(props) => props.theme.mobileXS} {
		width: 24rem;
	}
`;

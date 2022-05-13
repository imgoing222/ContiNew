import React, { InputHTMLAttributes, useState } from "react";
import styled from "styled-components";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { moneyUnitChange } from "@utils/index";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	title?: string;
	step: number;
	maxMin: { min: number; max: number };
	subTitle?: string;
	unit: string;
}

interface RangeValue {
	min: number;
	max: number;
}

interface RangeProps {
	color?: string;
}

function Slider({ title, subTitle, step, maxMin, unit }: Props) {
	const [localMin, setLocalMin] = useState(maxMin.min);
	const [localMax, setLocalMax] = useState(maxMin.max);

	const onChangeHandler = (value: RangeValue) => {
		const { min, max } = value;
		setLocalMin(Math.max(min, maxMin.min));
		setLocalMax(Math.min(max, maxMin.max));
	};

	return (
		<>
			<Title>{title}</Title>

			<Description>
				<Range>{subTitle}</Range>

				<Range color="red">
					{moneyUnitChange(localMin.toString())} ~ {moneyUnitChange(localMax.toString())}
				</Range>
			</Description>

			<Form>
				<InputRange
					draggableTrack
					formatLabel={(value) => `${value}`}
					maxValue={maxMin.max}
					minValue={maxMin.min}
					step={localMax > 3000 ? step * 2 : step}
					value={{ min: localMin, max: localMax }}
					onChange={(value) => {
						onChangeHandler(value as RangeValue);
					}}
					onChangeComplete={(value) => console.log(value)}
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
`;

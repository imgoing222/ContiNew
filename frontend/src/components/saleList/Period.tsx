import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { setPeriod } from "src/store/searchFilter";
import styled from "styled-components";
import Container from "./Container";

interface TextProps {
	color?: string;
}

function Period() {
	const dispatch = useDispatch();
	const period = useSelector((state: RootState) => state.searchFilter["period"]);
	const changeReduxHandler = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setPeriod({ period: +e.target.value }));
	};

	return (
		<Container title="임대 기간">
			<StyleDiv>
				<StyledH1> 임대 기간</StyledH1>
				<Text color="red">{period < 12 ? `${period}개월 이내` : "1년 이상"}</Text>
			</StyleDiv>
			<StyledInput
				type="range"
				max={12}
				min={0}
				step={3}
				onChange={changeReduxHandler}
				value={period}
			/>

			<StyleDiv>
				<Text>0</Text>
				<Text>12</Text>
			</StyleDiv>
		</Container>
	);
}

export default Period;

const StyledH1 = styled.h1`
	font-size: 2rem;
	margin-bottom: 1rem;
`;

const StyleDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Text = styled.p<TextProps>`
	font-size: 1.4rem;
	color: ${({ color }) => (color ? "#000" : "rgba(0, 0, 0, 0.3)")};
`;

const StyledInput = styled.input`
	height: 5px;
	margin-bottom: 1rem;
	position: relative;
`;

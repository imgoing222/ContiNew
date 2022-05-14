import OptionInfoList from "@components/createSale/OptionInfoList";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { setOptions } from "src/store/searchFilter";
import styled from "styled-components";
import Container from "./Container";

function Options() {
	const dispatch = useDispatch();
	const houseInfo = useSelector((state: RootState) => state.searchFilter);
	const optionsList = houseInfo["options"] as number[];
	const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
		const idx = optionsList.indexOf(+e.target.value);
		if (idx !== -1) {
			const deleteOption = optionsList.slice().filter((i) => i !== +e.target.value);
			return dispatch(setOptions({ options: deleteOption }));
		}
		const addOptions = optionsList.slice();
		addOptions.push(+e.target.value);
		dispatch(setOptions({ options: addOptions }));
	};
	const options = [
		"에어컨",
		"세탁기",
		"TV",
		"냉장고",
		"가스레인지",
		"인덕션",
		"전자레인지",
		"책상",
		"주차장",
	];
	return (
		<Container title="옵션">
			<StyledUl>
				{options.map((option, idx) => (
					<Div key={idx}>
						<OptionInfoList
							value={idx + 1}
							title={option}
							changeEvent={changeEvent}
							houseInfo={houseInfo}
						/>
					</Div>
				))}
			</StyledUl>
		</Container>
	);
}

export default Options;

const StyledUl = styled.ul`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
`;

const Div = styled.div`
	margin: 0.5rem;
`;

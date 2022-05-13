import { OptionInfo } from "@components/createSale";
import OptionInfoList from "@components/createSale/OptionInfoList";
import React, { useState } from "react";
import HouseInfo from "src/types/houseInfo";
import styled from "styled-components";
import Container from "./Container";

function Options() {
	const [a, setA] = useState();
	const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {};
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
					<Div>
						<OptionInfoList value={idx + 1} title={option} key={idx} changeEvent={changeEvent} />
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

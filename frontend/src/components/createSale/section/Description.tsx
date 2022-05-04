import React from "react";
import { EventProps } from "src/pages/createSale";
import styled from "styled-components";
import { SmallContainer } from "../Container";
function Description({ houseInfo, changeEvent, setHouseInfo }: EventProps) {
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (setHouseInfo) setHouseInfo({ ...houseInfo, description: e.target.value });
	};

	return (
		<SmallContainer title="상세 설명">
			<Textarea name="description" onChange={handleChange} value={houseInfo.description} />
		</SmallContainer>
	);
}

export default Description;

const Textarea = styled.textarea`
	width: 100%;
	height: 20rem;
	font-size: 1.3rem;
	padding: 1rem;
	outline: none;
	border: none;
	border-top: 1px solid ${(props) => props.theme.borderColor};
	resize: none;
`;

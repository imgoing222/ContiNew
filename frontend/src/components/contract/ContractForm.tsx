import { Header } from "@components/account/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { ContractType } from "src/types/contractType";
import styled from "styled-components";
import ContractInfo from "./ContractInfo";
import ContractorsInfo from "./ContractorsInfo";
import SaleInfo from "./SaleInfo";

function ContractForm() {
	const [disabled, setDisabled] = useState(true);
	const contract = useSelector((state: RootState) => state.contractInfo);
	const contractInfo: ContractType = contract["contract"];
	const step = contract["step"]["current_step"];
	const role = contract["role"]["user_role"];

	console.log(step, role);

	useEffect(() => {
		if (step === 1 && role === "seller") {
			setDisabled(false);
		}
	}, []);

	return (
		<Container>
			<Header>임차권 양도 양수 계약서</Header>
			<SaleInfo disabled={disabled} contractInfo={contractInfo} />
			<ContractInfo disabled={disabled} contractInfo={contractInfo} />
			<ContractorsInfo />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 80vw;
	margin: 3rem auto;
	border: 0.3px solid #dddddd;
	padding: 1.5rem;
`;

export default ContractForm;

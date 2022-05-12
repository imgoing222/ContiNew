import { Header } from "@components/account/Header";
import styled from "styled-components";
import ContractInfo from "./ContractInfo";
import ContractorsInfo from "./ContractorsInfo";
import SaleInfo from "./SaleInfo";

function ContractForm() {
	return (
		<Container>
			<Header>임차권 양도 양수 계약서</Header>
			<SaleInfo />
			<ContractInfo />
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

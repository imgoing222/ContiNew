import { Container } from "@components/account/Container";
import SaleInfo from "@components/createSale/SaleInfo";
import styled from "styled-components";

function index() {
	return (
		<Container>
			<SaleInfo />
		</Container>
	);
}

export default index;

const Conatiner = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-width: 120rem;
`;

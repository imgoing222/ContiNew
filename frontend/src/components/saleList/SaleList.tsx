import House from "src/types/getListType";
import styled from "styled-components";

interface SaleListProps {
	saleList: House[];
}

function SaleList({ saleList }: SaleListProps) {
	return (
		<Container>
			{saleList.map((item, idx) => (
				<p key={idx}>{item.address_detail}</p>
			))}
		</Container>
	);
}

export default SaleList;

const Container = styled.section`
	min-width: 38rem;
	border: 1px solid #000;
	display: flex;
	flex-direction: column;
`;

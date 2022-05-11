import House from "src/types/getListType";
import styled from "styled-components";
import DetailOfSale from "./DetailOfSale";

export interface SaleListProps {
	saleList: House[];
}

function SaleList({ saleList }: SaleListProps) {
	return (
		<Container>
			{saleList.length > 0 ? (
				<DetailOfSale saleList={saleList} />
			) : (
				<Div>
					<NoSale>매물 목록이 없습니다</NoSale>
				</Div>
			)}
		</Container>
	);
}

export default SaleList;

const Container = styled.section`
	min-width: 38rem;
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
`;

const Div = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transform: translateY(-15%);
`;
const NoSale = styled.h2``;

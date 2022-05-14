import React from "react";
import { useSelector } from "react-redux";
import { SearchCondition } from "src/pages/saleList";
import { RootState } from "src/store";
import House from "src/types/getListType";
import styled from "styled-components";
import DetailOfSale from "./DetailOfSale";
import SaleTypeFilter from "./SaleTypeFilter";

export interface SaleListProps {
	saleList: House[];
}

interface SaleList extends SaleListProps {
	searchCondition: SearchCondition;
}

function SaleList({ saleList, searchCondition }: SaleList) {
	const saleType = ["전체", "이어살기", "쉐어하우스"];
	return (
		<Container>
			<Box>
				{saleType.map((item, idx) => (
					<SaleTypeFilter searchCondition={searchCondition} id={item} key={idx} />
				))}
			</Box>
			{saleList.length > 0 ? (
				<DetailOfSale saleList={saleList} />
			) : (
				<Div>
					<h2>매물 목록이 없습니다</h2>
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
`;

const Div = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Box = styled.div`
	display: flex;
	margin: 1rem 0;
`;

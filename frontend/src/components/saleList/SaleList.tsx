import React from "react";
import { SearchCondition } from "src/pages/saleList";
import House from "src/types/getListType";
import styled from "styled-components";
import DetailOfSale from "./DetailOfSale";
import SaleTypeFilter from "./SaleTypeFilter";

export interface SaleListProps {
	saleList: House[];
}

interface SaleList extends SaleListProps {
	setSearchCondition: React.Dispatch<React.SetStateAction<SearchCondition>>;
	searchCondition: SearchCondition;
}

function SaleList({ saleList, searchCondition, setSearchCondition }: SaleList) {
	const changeSaleType = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (searchCondition) setSearchCondition({ ...searchCondition, [e.target.name]: e.target.id });
	};
	const saleType = ["전체", "이어살기", "쉐어하우스"];
	return (
		<Container>
			<Box>
				{saleType.map((item, idx) => (
					<SaleTypeFilter id={item} changeSaleType={changeSaleType} key={idx} />
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
	margin-top: 1rem;
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
	justify-content: center;
`;

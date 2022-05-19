import React from "react";
import { ArticleData, SearchCondition } from "src/pages/saleList";
import House from "src/types/getListType";
import styled from "styled-components";
import DetailOfSale from "./DetailOfSale";
import Pagination from "./Pagination";
import SaleTypeFilter from "./SaleTypeFilter";

export interface SaleListProps {
	saleList: House[];
}

interface SaleList extends SaleListProps {
	searchCondition: SearchCondition;
	currentPage: number;
	totalPage: number;
	setData: React.Dispatch<React.SetStateAction<ArticleData>>;
}

function SaleList({ saleList, searchCondition, totalPage, currentPage, setData }: SaleList) {
	const saleType = ["전체", "이어살기", "쉐어하우스"];
	return (
		<Container>
			<Box>
				{saleType.map((item, idx) => (
					<SaleTypeFilter searchCondition={searchCondition} id={item} key={idx} />
				))}
			</Box>
			{saleList.length > 0 ? (
				<>
					<DetailOfSale saleList={saleList} />
					<Pagination page={currentPage} total={totalPage} setData={setData} />
				</>
			) : (
				<Div>
					<StyledH2>매물 목록이 없습니다</StyledH2>
				</Div>
			)}
		</Container>
	);
}

export default SaleList;

const Container = styled.section`
	min-width: 33rem;
	max-height: calc(100vh - 12.5rem);
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}

	@media ${(props) => props.theme.mobile} {
		min-width: 20rem;
	}
	@media ${(props) => props.theme.mobileS} {
		min-width: 10rem;
	}
	@media ${(props) => props.theme.mobileXS} {
		min-width: 11rem;
	}
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
	margin: 1.5rem 0;
	justify-content: center;
`;

const StyledH2 = styled.h2`
	@media ${(props) => props.theme.mobileXS} {
		font-size: 0.9rem;
	}
`;

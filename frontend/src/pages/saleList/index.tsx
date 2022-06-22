import Map from "@components/saleList/Map";
import SaleList from "@components/saleList/SaleList";
import SaleListNav from "@components/saleList/SaleListNav";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { saleApi } from "src/api";
import { RootState } from "src/store";
import House from "src/types/getListType";
import styled from "styled-components";

export interface MapRefType {
	kakaoMap: React.MutableRefObject<kakao.maps.Map>;
}

export interface SearchCondition {
	yBottom?: number;
	yTop?: number;
	xLeft?: number;
	xRight?: number;
	saleType?: string;
	houseType?: string;
	contractType?: string;
	minDeposit?: number;
	maxDeposit?: number;
	minMonthlyRent?: number;
	maxMonthlyRent?: number;
	maxMaintenanceFee?: number;
	minMaintenanceFee?: number;
	period?: number;
	options?: number[];
}
export interface ArticleData {
	houses: House[];
	totalPage: number;
	currentPage: number;
}

function SaleListPage() {
	const kakaoMap = useRef<kakao.maps.Map>();
	const searchCondition = useSelector((state: RootState) => state.searchFilter);
	const [data, setData] = useState<ArticleData>({ houses: [], totalPage: 0, currentPage: 0 });
	const { totalPage, currentPage } = data;

	useEffect(() => {
		const getSales = async () => {
			const sales = await saleApi.getSales(searchCondition, currentPage);
			setData({
				houses: sales.data.houses,
				totalPage: sales.data.total_page_count,
				currentPage: sales.data.current_page_count,
			});
		};

		getSales();
	}, [searchCondition, currentPage]);

	return (
		<>
			<SaleListNav kakaoMap={kakaoMap as React.MutableRefObject<kakao.maps.Map>} />
			<Container>
				<SaleList
					saleList={data.houses}
					searchCondition={searchCondition}
					totalPage={totalPage}
					currentPage={currentPage}
					setData={setData}
				/>
				<Map
					searchCondition={searchCondition}
					kakaoMap={kakaoMap as React.MutableRefObject<kakao.maps.Map>}
				/>
			</Container>
		</>
	);
}
export default SaleListPage;

const Container = styled.div`
	display: flex;
`;

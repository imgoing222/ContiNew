import Map from "@components/saleList/Map";
import SaleList from "@components/saleList/SaleList";
import SaleListNav from "@components/saleList/SaleListNav";
import React, { useEffect, useRef, useState } from "react";
import { saleApi } from "src/api";
import House from "src/types/getListType";
import styled from "styled-components";

export interface MapRefType {
	kakaoMap: React.MutableRefObject<kakao.maps.Map>;
}

export interface SearchCondition {
	yBottom: number;
	yTop: number;
	xLeft: number;
	xRight: number;
	saleType?: string;
	houseType?: string;
	contractType?: string;
	minDeposit?: number;
	maxDeposit?: number;
	minMonthlyRent?: number;
	minMaintenanceFee?: number;
	maxMaintenanceFee?: number;
	period?: number;
}

function index() {
	const kakaoMap = useRef<kakao.maps.Map>();
	const [searchCondition, setSearchCondition] = useState<SearchCondition>({
		xRight: 0,
		yTop: 0,
		xLeft: 0,
		yBottom: 0,
	});

	const [saleList, setSaleList] = useState<House[]>([]);

	useEffect(() => {
		const getSales = async () => {
			const sales = await saleApi.getSales(searchCondition);
			setSaleList(sales.data.houses);
		};

		getSales();
	}, [searchCondition]);

	return (
		<>
			<SaleListNav kakaoMap={kakaoMap as React.MutableRefObject<kakao.maps.Map>} />
			<Container>
				<SaleList
					saleList={saleList}
					setSearchCondition={setSearchCondition}
					searchCondition={searchCondition}
				/>
				<Map
					kakaoMap={kakaoMap as React.MutableRefObject<kakao.maps.Map>}
					setSearchCondition={setSearchCondition}
					searchCondition={searchCondition}
				/>
			</Container>
		</>
	);
}
export default index;

const Container = styled.div`
	display: flex;
`;

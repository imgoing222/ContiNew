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
	y_bottom: number;
	y_top: number;
	x_left: number;
	x_right: number;
}

function index() {
	const kakaoMap = useRef<kakao.maps.Map>();
	const [searchCondition, setSearchCondition] = useState<SearchCondition>({
		x_right: 0,
		y_top: 0,
		x_left: 0,
		y_bottom: 0,
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
				<SaleList saleList={saleList} />
				<Map
					kakaoMap={kakaoMap as React.MutableRefObject<kakao.maps.Map>}
					setSearchCondition={setSearchCondition}
				/>
			</Container>
		</>
	);
}
export default index;

const Container = styled.div`
	display: flex;
`;

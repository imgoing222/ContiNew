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

export interface Coordinate {
	y_bottom: number;
	y_top: number;
	x_left: number;
	x_right: number;
}

function index() {
	const kakaoMap = useRef<kakao.maps.Map>();
	const [coordinates, setCoordinates] = useState<Coordinate>({
		x_right: 0,
		y_top: 0,
		x_left: 0,
		y_bottom: 0,
	});

	const [saleList, setSaleList] = useState<House[]>([]);

	useEffect(() => {
		const getSales = async () => {
			console.log(coordinates);
			const sales = await saleApi.getSales(coordinates);
			setSaleList(sales.data.houses);
		};
		getSales();
	}, [coordinates]);

	return (
		<>
			<SaleListNav kakaoMap={kakaoMap as React.MutableRefObject<kakao.maps.Map>} />
			<Container>
				<SaleList />
				<Map
					kakaoMap={kakaoMap as React.MutableRefObject<kakao.maps.Map>}
					setCoordinates={setCoordinates}
					saleList={saleList}
				/>
			</Container>
		</>
	);
}
export default index;

const Container = styled.div`
	display: flex;
`;

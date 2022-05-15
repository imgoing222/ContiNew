import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MapRefType } from "src/pages/saleList";
import { saleApi } from "src/api";
import { useDispatch } from "react-redux";
import { setCoodinates } from "src/store/searchFilter";
import House from "src/types/getListType";
import cluster from "cluster";

interface Map extends MapRefType {
	searchCondition: never;
}
function Map({ kakaoMap, searchCondition }: Map) {
	const [loadMap, setLoadMap] = useState(false);
	const dispatch = useDispatch();
	const getSales = () => {
		const coordinate = kakaoMap.current.getBounds();
		console.log(coordinate);
		const coordinates = {
			xRight: coordinate.oa,
			yTop: coordinate.pa,
			xLeft: coordinate.ha,
			yBottom: coordinate.qa,
		};

		dispatch(setCoodinates(coordinates));
	};

	const createmakers = (sale: House[]) => {
		const clusterer = new kakao.maps.MarkerClusterer({
			map: kakaoMap.current, // 마커들을 클러스터로 관리하고 표시할 지도 객체
			averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
			styles: [
				{
					background: "rgba(255, 80, 80, .8)",
					width: "4rem",
					height: "4rem",
					color: "#fff",
					borderRadius: "3rem",
					textAlign: "center",
					lineHeight: "4.1rem",
					fontSize: "2rem",
				},
			],
		});

		const markers = sale.map(
			(item) =>
				new kakao.maps.Marker({
					position: new kakao.maps.LatLng(item.latitude, item.longitude),
				}),
		);
		clusterer.setMinClusterSize(0);
		clusterer.clear();
		clusterer.addMarkers(markers);
	};

	useEffect(() => {
		const $script = document.createElement("script");
		$script.async = true;
		$script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&autoload=false&libraries=services,clusterer,drawing`;
		document.head.appendChild($script);

		const onLoadKakaoMap = () => {
			kakao.maps.load(() => {
				//  지도 생성
				const container = document.getElementById("map") as HTMLElement;
				const options = {
					center: new kakao.maps.LatLng(37.3595316, 127.1052133),
					level: 5,
				};
				kakaoMap.current = new kakao.maps.Map(container, options);

				//  줌 옵션 설정
				const zoomControl = new kakao.maps.ZoomControl();
				kakaoMap.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

				kakao.maps.event.addListener(kakaoMap.current, "dragend", getSales);
			});
		};

		$script.addEventListener("load", onLoadKakaoMap);
		$script.addEventListener("load", () => setLoadMap(true));

		return () => $script.removeEventListener("load", onLoadKakaoMap);
	}, []);

	useEffect(() => {
		const getSales = async () => {
			const sale = (await saleApi.getSales(searchCondition)).data.houses;
			createmakers(sale);
		};
		if (loadMap) getSales();
	}, [searchCondition]);
	return (
		<>
			<Container id="map"></Container>
		</>
	);
}

export default Map;

const Container = styled.div`
	width: 100%;
	height: calc(100vh - 5rem);
`;

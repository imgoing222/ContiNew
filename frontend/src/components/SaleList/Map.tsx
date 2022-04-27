import React, { useEffect } from "react";
import styled from "styled-components";
import { MapRefType } from "src/pages/SaleList/SaleListPage";

function Map({ kakaoMap }: MapRefType) {
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

				// 임시 데터
				const data = [
					{ y: 37.3595316, x: 127.1052133, content: "네이버" },
					{ y: 37.359531, x: 127.1052133, content: "다음" },
					{ y: 37.5559, x: 126.9723, content: "네이버" },
					{ y: 37.5663, x: 126.9779, content: "네이버" },
					{ y: 37.5465, x: 126.9647, content: "네이버" },
				];
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
				clusterer.setMinClusterSize(0);
				const markers = data.map(
					(item) =>
						new kakao.maps.Marker({
							position: new kakao.maps.LatLng(item.y, item.x),
						}),
				);

				clusterer.addMarkers(markers);
				kakao.maps.event.addListener(kakaoMap.current, "bounds_changed", function () {
					console.log(kakaoMap.current.getBounds());
				});
			});
		};
		$script.addEventListener("load", onLoadKakaoMap);

		return () => $script.removeEventListener("load", onLoadKakaoMap);
	}, []);

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

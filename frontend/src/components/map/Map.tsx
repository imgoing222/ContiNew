import Script from "next/script";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

function Map() {
	const [myLocation, setMyLocation] = useState<{ latitude: number; longitude: number } | string>(
		"",
	);
	const [zoom, setZoom] = useState(11);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, error);
		}

		// 위치추적에 성공했을때 위치 값을 세팅 이후에 검색한 주소의 latitude, longitude로 받아오기
		function success(position: any) {
			setMyLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		}

		// 위치 추적에 실패 했을때 초기값
		function error() {
			setMyLocation({ latitude: 37.3595704, longitude: 127.105399 });
		}
	}, []);

	const mapRef = useRef<HTMLElement | null | any>(null);
	const markerRef = useRef<any | null>(null);
	useEffect(() => {
		const data = [
			{ name: "hi", map_y_location: 37.3595706, map_x_location: 127.1054399, length: 5 },
			{ name: "naver", map_y_location: 37.3595709, map_x_location: 127.10539, length: 2 },
		];
		if (typeof myLocation !== "string") {
			mapRef.current = new naver.maps.Map("map", {
				zoom,
				center: new naver.maps.LatLng(myLocation.latitude, myLocation.longitude),
				zoomControl: true,
				zoomControlOptions: {
					style: naver.maps.ZoomControlStyle.SMALL,
					position: naver.maps.Position.RIGHT_TOP,
				},
			});

			// 여러 마커 생성  함수
			data?.map((item) => {
				markerRef.current = new naver.maps.Marker({
					position: new naver.maps.LatLng(item?.map_y_location, item?.map_x_location),
					map: mapRef.current,
					title: item.name,
					icon: {
						content: `
						<div>
						<span>${item.length}</span>
						<span>${item.name}</span>
			</div>`,
						size: new naver.maps.Size(33, 44),
						origin: new naver.maps.Point(0, 0),
						anchor: new naver.maps.Point(11, 35),
					},
				});
			});
		}
	}, [mapRef, myLocation]);

	return (
		<>
			<Script
				type="text/javascript"
				src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=hbx0fr2s1r"
			></Script>
			<div id="map" style={{ width: "70%", height: "100vh" }}></div>
		</>
	);
}

export default Map;

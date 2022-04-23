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

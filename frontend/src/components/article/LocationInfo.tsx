import { useEffect, useRef } from "react";
import styled from "styled-components";
import Container from "./Container";

function LocationInfo() {
	const houseInfo = {
		address_detail: "스카이빌",
		jibun_address: "서울특별시 용산구 한강대로 지하 392",
	};
	const kakaoMap = useRef<kakao.maps.Map>();
	useEffect(() => {
		const $script = document.createElement("script");
		$script.async = true;
		$script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&autoload=false&libraries=services,clusterer,drawing`;
		document.head.appendChild($script);

		const onLoadKakaoMap = () => {
			kakao.maps.load(() => {
				//  지도 생성
				const container = document.getElementById("map") as HTMLElement;

				const geocoder = new kakao.maps.services.Geocoder();
				const options = {
					center: new kakao.maps.LatLng(37.3595316, 127.1052133),
					level: 3,
				};
				kakaoMap.current = new kakao.maps.Map(container, options);
				geocoder.addressSearch(`${houseInfo.jibun_address}`, function (result, status) {
					console.log(result);
					if (status === kakao.maps.services.Status.OK) {
						const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
						const marker = new kakao.maps.Marker({
							map: kakaoMap.current,
							position: coords,
						});
						console.log(result);
						kakaoMap.current.setCenter(coords);
					}
				});
			});
		};
		$script.addEventListener("load", onLoadKakaoMap);

		return () => $script.removeEventListener("load", onLoadKakaoMap);
	}, []);

	return (
		<Container title="위치 정보">
			<Text>{houseInfo.jibun_address}</Text>
			<Map id="map"></Map>
		</Container>
	);
}

export default LocationInfo;

const Map = styled.div`
	width: 100%;
	height: 50rem;
`;

const Text = styled.p`
	font-size: 1.5rem;
	margin-bottom: 1rem;
`;

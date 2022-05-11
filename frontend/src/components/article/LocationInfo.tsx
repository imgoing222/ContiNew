import { useEffect, useRef } from "react";
import { HouseInfoProps } from "src/pages/article/[id]";
import styled from "styled-components";
import Container from "./Container";

function LocationInfo({ houseInfo }: HouseInfoProps) {
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
				geocoder.addressSearch(`${houseInfo.jibunAddress}`, function (result, status) {
					if (status === kakao.maps.services.Status.OK) {
						const coords = new kakao.maps.LatLng(+result[0].y, +result[0].x);
						const marker = new kakao.maps.Marker({
							map: kakaoMap.current,
							position: coords,
						});
						if (kakaoMap.current) kakaoMap.current.setCenter(coords);
					}
				});
			});
		};
		$script.addEventListener("load", onLoadKakaoMap);

		return () => $script.removeEventListener("load", onLoadKakaoMap);
	}, []);

	return (
		<Container title="위치 정보">
			<Text>{houseInfo.jibunAddress}</Text>
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

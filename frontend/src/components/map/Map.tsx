import { useEffect, useRef } from "react";

function Map() {
	const kakaoMap = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const $script = document.createElement("script");
		$script.async = true;
		$script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&autoload=false`;
		document.head.appendChild($script);

		const onLoadKakaoMap = () => {
			window.kakao.maps.load(() => {
				const container = document.getElementById("map");
				const options = {
					center: new window.kakao.maps.LatLng(37.5559, 126.9723),
				};
				kakaoMap.current = new window.kakao.maps.Map(container, options);
				const markerPosition = new window.kakao.maps.LatLng(37.5559, 126.9723);
				const marker = new window.kakao.maps.Marker({
					position: markerPosition,
				});
				marker.setMap(kakaoMap.current);
			});
		};
		$script.addEventListener("load", onLoadKakaoMap);

		return () => $script.removeEventListener("load", onLoadKakaoMap);
	}, []);

	// const data = [
	// 	{ y: 37.3595316, x: 127.1052133, content: "네이버", num: 10 },
	// 	{ y: 37.3595315, x: 127.1052133, content: "다음", num: 22 },
	// ];

	return (
		<>
			<div
				id="map"
				style={{
					width: "70%",
					height: "700px",
				}}
			></div>
		</>
	);
}

export default Map;

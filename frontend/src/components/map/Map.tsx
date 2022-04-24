import React, { useEffect, useRef, useState } from "react";

function Map() {
	const kakaoMap = useRef<HTMLElement | null>(null);
	const [keyword, setKeyword] = useState("");
	useEffect(() => {
		const $script = document.createElement("script");
		$script.async = true;
		$script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&autoload=false&libraries=services,clusterer,drawing`;
		document.head.appendChild($script);

		const onLoadKakaoMap = () => {
			window.kakao.maps.load(() => {
				const container = document.getElementById("map");
				const options = {
					center: new window.kakao.maps.LatLng(37.3595316, 127.1052133),
					level: 8,
				};
				kakaoMap.current = new window.kakao.maps.Map(container, options);
				const data = [
					{ y: 37.3595316, x: 127.1052133, content: "네이버", num: 10 },
					{ y: 37.3595315, x: 127.1052133, content: "다음", num: 22 },
				];
				const clusterer = new window.kakao.maps.MarkerClusterer({
					map: kakaoMap.current, // 마커들을 클러스터로 관리하고 표시할 지도 객체
					averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
					minLevel: 8, // 클러스터 할 최소 지도 레벨
				});
				const markers = data.map(
					(item) =>
						new window.kakao.maps.Marker({
							position: new window.kakao.maps.LatLng(item.y, item.x),
						}),
				);

				clusterer.addMarkers(markers);
			});
		};
		$script.addEventListener("load", onLoadKakaoMap);

		return () => $script.removeEventListener("load", onLoadKakaoMap);
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const geocoder = new window.kakao.maps.services.Geocoder();
		geocoder.addressSearch(keyword, function (result, status) {
			// 정상적으로 검색이 완료됐으면
			if (result.length === 0) alert("검색 결과가 없습니다");
			if (status === window.kakao.maps.services.Status.OK) {
				var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

				// 결과값으로 받은 위치를 마커로 표시합니다
				var marker = new window.kakao.maps.Marker({
					map: kakaoMap.current,
					position: coords,
				});

				// 인포윈도우로 장소에 대한 설명을 표시합니다
				var infowindow = new window.kakao.maps.InfoWindow({
					content: `<div style="width:150px;text-align:center;padding:6px 0;">${result[0].address_name}</div>`,
				});
				infowindow.open(kakaoMap.current, marker);

				// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
				kakaoMap.current.setCenter(coords);
			}
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				검색
				<input type="text" value={keyword} onChange={handleChange} />
			</form>
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

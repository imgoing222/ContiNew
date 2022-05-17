import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { SearchSection, RecommendSection } from "@components/main";
import Footer from "@components/footer/Footer";

interface AddressType {
	sido_name: string;
	gungu_name: string;
	dong_name: string;
}

function MainPage() {
	const [addressData, setAddressData] = useState<AddressType>({
		sido_name: "서울",
		gungu_name: "동대문구",
		dong_name: "이문동",
	});

	useEffect(() => {
		getLocation();
	}, []);

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const lon = String(position.coords.longitude);
					const lat = String(position.coords.latitude);
					addressRequest(lon, lat);
				},
				(error) => {
					console.error(error);
				},
				{
					enableHighAccuracy: false,
					maximumAge: 0,
					timeout: Infinity,
				},
			);
		} else {
			alert("GPS를 지원하지 않습니다");
		}
	};

	const addressRequest = (lon: string, lat: string) => {
		axios
			.get("https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" + lon + "&y=" + lat, {
				headers: {
					Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API}`,
				},
				withCredentials: false,
			})
			.then((response) => {
				if (response.data.documents.length) {
					const addressData = {
						sido_name: response.data.documents[0].address.region_1depth_name,
						gungu_name: response.data.documents[0].address.region_2depth_name,
						dong_name: response.data.documents[0].address.region_3depth_name,
					};
					setAddressData(addressData);
				} else {
					alert("위치 정보를 받아오는데 실패했습니다.")
				}
			});
	};

	return (
		<>
			<Main>
				<SearchSection />
				<RecommendSection addressData={addressData} />
			</Main>
			<Footer />
		</>
	);
}

const Main = styled.main`
	height: 100vh;
`;

export default MainPage;

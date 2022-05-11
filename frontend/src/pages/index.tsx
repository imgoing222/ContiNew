import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { SearchSection, RecommendSection } from "@components/main";
import Footer from "@components/footer/Footer";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

const DUMMY_DATA = [
	{
		id: 1,
		imageUrl:
			"https://images.unsplash.com/photo-1505691723518-36a5ac3be353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
	},
	{
		id: 2,
		imageUrl:
			"https://images.unsplash.com/flagged/photo-1573168710465-7f7da9a23a15?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
	},
	{
		id: 3,
		imageUrl:
			"https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
	},
];

interface recommendDataType {
	recommendData: { id: number; imageUrl: string }[];
}

interface AddressType {
	sido_name: string;
	gungu_name: string;
	dong_name: string;
}

function MainPage({ recommendData }: recommendDataType) {
	const [addressName, setAddressName] = useState<AddressType>();
	useEffect(() => {
		getLocation();
	}, []);

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log(position.coords.latitude + " " + position.coords.longitude);
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
				console.log(response.data.documents[0].address);
				const addressData = {
					sido_name: response.data.documents[0].address.region_1depth_name,
					gungu_name: response.data.documents[0].address.region_2depth_name,
					dong_name: response.data.documents[0].address.region_3depth_name,
				};
				setAddressName(addressData);
			});
	};

	return (
		<>
			<Main>
				<SearchSection />
				<RecommendSection recommendData={recommendData} addressName={addressName} />
			</Main>
			<Footer />
		</>
	);
}

const Main = styled.main``;

export async function getStaticProps() {
	return {
		props: {
			recommendData: DUMMY_DATA,
		},
		revalidate: 3600,
	};
}

export default MainPage;

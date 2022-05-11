import Head from "next/head";
import { useEffect } from "react";
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

function MainPage({ recommendData }: recommendDataType) {
	useEffect(() => {
		getLocation();
	}, []);

	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log(position.coords.latitude + " " + position.coords.longitude);
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

	return (
		<>
			<Main>
				<SearchSection />
				<RecommendSection recommendData={recommendData} />
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

import { useEffect, useState } from "react";
import styled from "styled-components";

import { mainApi } from "src/api";

interface DataProps {
	recommendData: { id: number; imageUrl: string }[];
	addressName: {
		sido_name: string;
		gungu_name: string;
		dong_name: string;
	};
}

function RecommendSection({ recommendData, addressName }: DataProps) {
	const testData = {
		sido_name: "서울",
		gungu_name: "동대문구",
		dong_name: "이문동",
	};
	useEffect(() => {
		getAroundHouse();
	}, []);

	const getAroundHouse = async () => {
		try {
			const res = await mainApi.getAroundHouse(testData);
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Section>
			<Title>{addressName.dong_name} 추천매물</Title>
			<Ul>
				{recommendData.map((recommend) => (
					<Li key={recommend.id}>
						<Image src={recommend.imageUrl} alt="recommend-img" />
					</Li>
				))}
			</Ul>
		</Section>
	);
}

const Section = styled.section`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 40rem;
`;

const Title = styled.div`
	height: 5rem;
	font-size: 3rem;
`;

const Ul = styled.ul`
	display: flex;
	justify-content: center;
	list-style: none;
	padding: 0;
`;

const Li = styled.li`
	margin: 1rem;
`;

const Image = styled.img`
	width: 15rem;
	height: 15rem;
`;
export default RecommendSection;

import { useEffect, useState } from "react";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { mainApi } from "src/api";
import House from "src/types/getListType";
import RecommendItem from "./RecommendItem";

interface DataProps {
	addressData: {
		sido_name: string;
		gungu_name: string;
		dong_name: string;
	};
}

function RecommendSection({ addressData }: DataProps) {
	const [aroundHousesData, setAroundHousesData] = useState<House[]>([]);
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
			setAroundHousesData(res.data.houses);
		} catch (error) {
			console.log(error);
		}
	};
	
	return (
		<Section>
			<Title>{addressData.dong_name} 추천매물</Title>
			{/* {aroundHousesData.length > 3 && (
				<>
					<ButtonDiv direction="right">
						<Button icon={faChevronRight} />
					</ButtonDiv>
					<ButtonDiv>
						<Button icon={faChevronLeft} />
					</ButtonDiv>
				</>
			)} */}
			<Ul>
				{aroundHousesData.map((house) => (
					<RecommendItem key={house.house_id} house={house} />
				))}
			</Ul>
		</Section>
	);
}

const Section = styled.section`
	width: 900px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 10rem auto;
`;

const Title = styled.div`
	height: 5rem;
	font-size: 3rem;
`;

const Ul = styled.ul`
	display: flex;
	list-style: none;
	padding: 0;
	overflow: hidden;
`;

const Button = styled(FontAwesomeIcon)`
	display: block;
	font-size: 3rem;
	cursor: pointer;
`;

interface Button {
	direction?: string;
}

const ButtonDiv = styled.div<Button>`
	width: 5rem;
	height: 5rem;
	// display: flex;
	// align-items: center;
	// justify-content: center;
	position: relative;
	right: ${({ direction }) => direction && "0"};
	left: ${({ direction }) => !direction && "0"};
`;

export default RecommendSection;

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

	useEffect(() => {
		getAroundHouse();
	}, []);

	const getAroundHouse = async () => {
		try {
			const res = await mainApi.getAroundHouse(addressData);
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
				{aroundHousesData.length ? (
					aroundHousesData.map((house) => <RecommendItem key={house.house_id} house={house} />)
				) : (
					<TextBox>
						<Text>등록된 매물이 없습니다.</Text>
					</TextBox>
				)}
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
	font-size: 4rem;
`;

const Ul = styled.ul`
	display: flex;
	list-style: none;
	padding: 0;
	overflow: hidden;
`;

const TextBox = styled.div`
	width: 100%;
	height: 25rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Text = styled.p`
	font-size: 2.5rem;
	margin: 2rem;
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

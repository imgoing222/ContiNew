import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import { mainApi } from "src/api";
import House from "src/types/getListType";
import RecommendItem from "./RecommendItem";
import { Button } from "./Button";

interface DataProps {
	addressData: {
		sido_name: string;
		gungu_name: string;
		dong_name: string;
	};
}

function RecommendSection({ addressData }: DataProps) {
	const router = useRouter();
	const [aroundHousesData, setAroundHousesData] = useState<House[]>([]);

	useEffect(() => {
		getAroundHouse();
	}, [addressData]);

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
						<div>
							<Span>다른 동네</Span>
							<Button onClick={() => router.push("/saleList")}>보러 가기</Button>
						</div>
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
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Span = styled.span`
	font-size: 1.5rem;
	padding: 0.5rem;
`;

const Text = styled.p`
	font-size: 2.5rem;
	margin: 2rem;
`;
export default RecommendSection;

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
	const [scrollState, setScrollState] = useState(0);
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

	const handleScroll = (direction?: string) => {
		if (direction) {
			setScrollState(scrollState - 25);
		} else {
			setScrollState(scrollState + 25);
		}
	};

	return (
		<Section>
			<Title>{addressData.dong_name} 추천매물</Title>
			<Ul scrollState={scrollState}>
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
			{aroundHousesData.length > 3 && (
				<ArrowButtonBox>
					<ArrowButtonDiv scrollState={scrollState}>
						<ArrowButton icon={faChevronLeft} onClick={() => handleScroll()} />
					</ArrowButtonDiv>
					<ArrowButtonDiv direction="right" scrollState={scrollState}>
						<ArrowButton icon={faChevronRight} onClick={() => handleScroll("right")} />
					</ArrowButtonDiv>
				</ArrowButtonBox>
			)}
		</Section>
	);
}

const Section = styled.section`
	width: 900px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 10rem auto;
	overflow: hidden;

	@media ${(props) => props.theme.tabletS} {
		width: 300px;
	}
`;

const Title = styled.div`
	height: 5rem;
	font-size: 4rem;
`;

interface UIType {
	scrollState: number;
}

const Ul = styled.ul<UIType>`
	display: flex;
	list-style: none;
	padding: 0;
	transform: ${({ scrollState }) => "translateX(" + scrollState + "%);"}
	transition: all 0.5s;

	@media ${(props) => props.theme.tabletS} {
		transform: ${({ scrollState }) => "translateX(" + scrollState * 4 + "%);"}
	}
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

const ArrowButton = styled(FontAwesomeIcon)`
	display: block;
	font-size: 3rem;
	z-index: 2;
	cursor: pointer;
	color: #000;
`;

interface ArrowButtonType {
	direction?: string;
	scrollState: number;
}

const ArrowButtonDiv = styled.div<ArrowButtonType>`
	pointer-events: ${({ direction, scrollState }) =>
		direction && scrollState === -100 ? "none" : ""};
	pointer-events: ${({ direction, scrollState }) =>
		!direction && scrollState === 0 ? "none" : ""};
	opacity: ${({ direction, scrollState }) => (direction && scrollState === -100 ? "0.2" : "")};
	opacity: ${({ direction, scrollState }) => (!direction && scrollState === 0 ? "0.2" : "")};
`;

const ArrowButtonBox = styled.div`
	display: flex;
	justify-content: space-between;
`;

export default RecommendSection;

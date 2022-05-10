import CardDescription from "@components/article/CardDescription";
import Description from "@components/article/Description";
import LocationInfo from "@components/article/LocationInfo";
import OptionInfo from "@components/article/OptionalInfo";
import Photos from "@components/article/Photos";
import PriceInfo from "@components/article/PriceInfo";
import getArticleData from "@utils/getArticle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArticleType from "src/types/getArticleType";
import styled from "styled-components";

export interface HouseInfoProps {
	houseInfo: ArticleType;
}

function index() {
	const router = useRouter();
	const [houseInfo, setHouseInfo] = useState<ArticleType | null>(null);

	useEffect(() => {
		const setData = async () => {
			setHouseInfo(await getArticleData(11));
		};

		setData();
	}, []);

	return (
		houseInfo !== null && (
			<Div>
				<Photos />
				<Container>
					<SaleInfo>
						<PriceInfo houseInfo={houseInfo} />
						<OptionInfo />
						<LocationInfo houseInfo={houseInfo} />
						<Description houseInfo={houseInfo} />
					</SaleInfo>
					<Card>
						<CardDescription houseInfo={houseInfo} />
					</Card>
				</Container>
			</Div>
		)
	);
}

export default index;

const Container = styled.div`
	display: flex;
`;
const Div = styled.div`
	width: 120rem;
	margin: 4rem auto;
	display: flex;
	flex-direction: column;
`;

const SaleInfo = styled.div`
	width: 78rem;
`;

const Card = styled.div`
	width: 46rem;
	display: flex;
	flex-direction: row-reverse;
`;

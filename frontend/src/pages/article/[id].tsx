import {
	CardDescription,
	Description,
	LocationInfo,
	OptionInfo,
	Photos,
	PriceInfo,
	CardButton,
} from "@components/article";
import { getArticleData, snakeToCamel } from "@utils/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ArticleType from "src/types/getArticleType";
import styled from "styled-components";
import Error from "next/error";
import Spinner from "@components/Spinner";
export interface HouseInfoProps {
	houseInfo: ArticleType;
}

function index() {
	const router = useRouter();
	const [houseInfo, setHouseInfo] = useState<ArticleType | null>(null);
	const id = router.query.id;
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const setData = async () => {
			if (id !== undefined) {
				const data = await getArticleData(+id);
				if (data !== undefined) setHouseInfo(snakeToCamel(data) as ArticleType);
				setIsLoading(false);
			}
		};

		setData();
	}, [id]);

	if (isLoading) {
		return <Spinner />;
	}
	return houseInfo !== null ? (
		<Div>
			<Photos houseInfo={houseInfo} />
			<Container>
				<SaleInfo>
					<PriceInfo houseInfo={houseInfo} />
					<OptionInfo houseInfo={houseInfo} />
					<LocationInfo houseInfo={houseInfo} />
					<Description houseInfo={houseInfo} />
					<CardButton houseInfo={houseInfo} />
				</SaleInfo>
				<Card>
					<CardDescription houseInfo={houseInfo} />
				</Card>
			</Container>
		</Div>
	) : (
		<Error statusCode={404} />
	);
}

export default index;

const Container = styled.div`
	display: flex;
`;
const Div = styled.div`
	max-width: 120rem;
	margin: 4rem auto;
	display: flex;
	flex-direction: column;
	@media ${(props) => props.theme.mobileXS} {
		width: auto;
	}
`;

const SaleInfo = styled.div`
	width: 78rem;
	@media ${(props) => props.theme.mobileXS} {
		width: auto;
	}
`;

const Card = styled.div`
	width: 46rem;
	display: flex;
	flex-direction: row-reverse;
	@media ${(props) => props.theme.mobileXS} {
		display: none;
	}
`;

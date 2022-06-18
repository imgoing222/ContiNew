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
import { articleApi } from "src/api";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
export interface HouseInfoProps {
	houseInfo: ArticleType;
}

function Article() {
	const router = useRouter();
	const [houseInfo, setHouseInfo] = useState<ArticleType | null>(null);
	const [isBookmark, setIsBookmark] = useState(false);
	const id = router.query.id;
	const [isLoading, setIsLoading] = useState(true);
	const isLogin = useSelector((state: RootState) => state.userInfo.id);
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
	useEffect(() => {
		const checkBookmark = async () => {
			if (id !== undefined && isLogin) {
				const bookmarkConfirm = (await articleApi.checkBoomark(+id)).data.is_liked;
				setIsBookmark(bookmarkConfirm);
			}
		};
		checkBookmark();
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
					<StyledDiv>
						<CardButton
							houseInfo={houseInfo}
							isBookmark={isBookmark}
							setIsBookmark={setIsBookmark}
						/>
					</StyledDiv>
				</SaleInfo>
				<Card>
					<CardDescription
						houseInfo={houseInfo}
						isBookmark={isBookmark}
						setIsBookmark={setIsBookmark}
					/>
				</Card>
			</Container>
		</Div>
	) : (
		<Error statusCode={404} />
	);
}

export default Article;

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

const StyledDiv = styled.div`
	display: none;
	@media screen and (max-width: 450px) {
		display: block;
	}
`;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "src/store";

import ArticleType from "src/types/getArticleType";
import getArticleData from "@utils/getArticle";
import snakeToCamel from "@utils/snakeToCamel";
import ContractButton from "./ContractButton";
import { PriceInfo } from "@components/article";

interface Props {
	isIndex?: boolean;
	sendMessage?: (inputChat: string) => void;
}

function ItemDetail({ isIndex, sendMessage }: Props) {
	const { articleId } = useSelector((state: RootState) => state.articleInfo);
	const [houseInfo, setHouseInfo] = useState<ArticleType | null>(null);

	useEffect(() => {
		if (!isIndex) {
			const setData = async () => {
				const data = await getArticleData(articleId);

				setHouseInfo(snakeToCamel(data) as ArticleType);
			};

			setData();
		}
		return setHouseInfo(null);
	}, []);

	return (
		<Container>
			<Title>
				<h2>Detail</h2>
			</Title>
			{houseInfo && (
				<Content>
					<MainImage src={houseInfo.images[0]} />
					<ContractButton sendMessage={sendMessage} />
					<PriceInfo houseInfo={houseInfo} />
					<LocationTitle>위치 정보</LocationTitle>
					<Address>{houseInfo.jibunAddress}</Address>
				</Content>
			)}
		</Container>
	);
}

const Container = styled.div`
	width: 40rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-left: solid 2px #d3d3d3;
`;

const Title = styled.div`
	width: 100%;
	height: 8rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: solid 2px #d3d3d3;
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
	min-height: 5rem;
	overflow: auto;
`;

const LocationTitle = styled.h1`
	font-size: 2.5rem;
	margin-bottom: 3rem;
`;

const Address = styled.p`
	font-size: 1.8rem;
`;

const MainImage = styled.img`
	width: 100%;
	max-height: 20rem;
`;

export default ItemDetail;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "src/store";

import ArticleType from "src/types/getArticleType";
import getArticleData from "@utils/getArticle";
import snakeToCamel from "@utils/snakeToCamel";

function ItemDetail() {
	const { article_id } = useSelector((state: RootState) => state.articleId);
	const [houseInfo, setHouseInfo] = useState<ArticleType | null>(null);

	useEffect(() => {
		if (article_id !== 0) {
			const setData = async () => {
				const data = await getArticleData(article_id);

				setHouseInfo(snakeToCamel(data) as ArticleType);
			};

			setData();
		}
	}, []);

	return (
		<Container>
			<Title>
				<h3>Detail</h3>
			</Title>
			{houseInfo && (
				<div>
					<div>
						<img src={houseInfo.images[0]} alt="Img" width={400} height={200} />
					</div>
					<div>
						<h3>가격정보.</h3>
						<p>
							{houseInfo.contractType}: {houseInfo.deposit}/{houseInfo.monthlyRent}
						</p>
						<p>관리비: 매월 {houseInfo.maintenanceFee} 원</p>
						<h3>위치</h3>
						<p>{houseInfo.jibunAddress}</p>
					</div>
				</div>
			)}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex: 3;
	flex-direction: column;
	align-items: center;
	height: 100%;
	border-left: solid 2px #d3d3d3;
`;

const Title = styled.div`
	width: 100%;
	height: 5rem;
	text-align: center;
	border-bottom: solid 2px #d3d3d3;
`;

export default ItemDetail;

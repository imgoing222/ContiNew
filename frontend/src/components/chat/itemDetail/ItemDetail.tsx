import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "src/store";

import ArticleType from "src/types/getArticleType";
import getArticleData from "@utils/getArticle";
import snakeToCamel from "@utils/snakeToCamel";
import ContractButton from "./ContractButton";

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
				<h3>Detail</h3>
			</Title>
			<Content>
				{houseInfo && (
					<div>
						<div>
							<img src={houseInfo.images[0]} alt="Img" width="100%" height={200} />
						</div>
						<div>
							<h3>가격정보.</h3>
							<p>
								{houseInfo.contractType}: {houseInfo.deposit}/{houseInfo.monthlyRent}
							</p>
							<p>관리비: 매월 {houseInfo.maintenanceFee} 만 원</p>
							<h3>위치</h3>
							<p>{houseInfo.jibunAddress}</p>
						</div>
						<ContractButton sendMessage={sendMessage} />
					</div>
				)}
			</Content>
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
	text-align: center;
	border-bottom: solid 2px #d3d3d3;
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
	min-height: 5rem;
`;

export default ItemDetail;

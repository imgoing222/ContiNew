import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import profileApi from "src/api/profile";
import House from "src/types/getListType";
import styled from "styled-components";
import { Container } from "./Container";

function MyArticle() {
	const router = useRouter();
	const [myArticles, setMyArticle] = useState<House[]>();

	useEffect(() => {
		getMyArticles();
	}, []);

	const getMyArticles = async () => {
		const res = await profileApi.getMyArticles();
		console.log(res.data);
		setMyArticle([...res.data]);
	};

	return (
		<Container>
			{myArticles && myArticles.length > 0 ? (
				myArticles.map((article) => (
					<ArticleItem onClick={() => router.push(`/article/${article.house_id}`)}>
						<img src={article.main_image} />
						<div>
							<p>{article.sale_type}</p>
							<p>{article.house_type}</p>
							<p>{article.jibun_address}</p>
							<p>{article.description}</p>
							<p>보증금 : {article.deposit}</p>
							<p>월세 : {article.monthly_rent}</p>
							<p>관리비 : {article.maintenance_fee}</p>
						</div>
					</ArticleItem>
				))
			) : (
				<Text>등록한 매물이 없습니다.</Text>
			)}
		</Container>
	);
}

const ArticleItem = styled.div`
	display: flex;
	cursor: pointer;
`;

const Text = styled.p`
	font-size: 1.6rem;
	text-align: center;
	margin-top: 20rem;
`;
export default MyArticle;

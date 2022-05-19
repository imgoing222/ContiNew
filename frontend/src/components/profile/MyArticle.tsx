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
				myArticles.map((article, idx) => (
					<ArticleItem onClick={() => router.push(`/article/${article.house_id}`)} key={idx}>
						<Image src={article.main_image} />
						<div>
							<Info>{article.sale_type}</Info>
							<Info>{article.house_type}</Info>
							<Info>{article.jibun_address}</Info>
							<Info>
								{article.description.length > 39
									? `${article.description.slice(0, 40)}...`
									: article.description}
							</Info>
							<Info>
								{article.deposit} / {article.monthly_rent}
							</Info>
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
	margin: 3rem 0;
	border: 0.3px solid #dddddd;
	cursor: pointer;
	padding: 2rem;
`;

const Image = styled.img`
	display: block;
	width: 50%;
	margin-right: 4rem;
	height: 20vh;
	border-radius: 0.5rem;
`;

const Info = styled.p`
	margin: 1rem 0 0;
	font-size: 1.4rem;
`;

const Text = styled.p`
	font-size: 1.6rem;
	text-align: center;
	margin-top: 20rem;
`;
export default MyArticle;

import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import profileApi from "src/api/profile";
import House from "src/types/getListType";
import styled from "styled-components";
import { Container } from "./Container";

function MyArticle() {
	const [myArticle, setMyArticle] = useState<House>();
	const router = useRouter();

	useEffect(() => {
		getMyArticles();
	}, []);

	const getMyArticles = async () => {
		const res = await profileApi.getMyArticles();
		setMyArticle(res.data[0]);
	};
	return (
		<Container>
			{myArticle ? (
				<ArticleItem onClick={() => router.push(`/article/${myArticle.house_id}`)}>
					<img src={myArticle.main_image} />
					<div>
						<p>{myArticle.sale_type}</p>
						<p>{myArticle.house_type}</p>
						<p>{myArticle.jibun_address}</p>
						<p>{myArticle.description}</p>
						<p>보증금 : {myArticle.deposit}</p>
						<p>월세 : {myArticle.monthly_rent}</p>
						<p>관리비 : {myArticle.maintenance_fee}</p>
					</div>
				</ArticleItem>
			) : (
				<p>등록한 매물이 없습니다.</p>
			)}
		</Container>
	);
}

const ArticleItem = styled.div`
	display: flex;
	cursor: pointer;
`;

export default MyArticle;

import changeMonthToYear from "@utils/changeMonthToYear";
import changeMoneyUnit from "@utils/moneyUnitChange";
import Link from "next/link";
import { RootStateOrAny, useSelector } from "react-redux";
import articleApi from "src/api/article";
import { HouseInfoProps } from "src/pages/article/[id]";
import styled from "styled-components";
import IconPart from "./IconPart";

interface TextProp {
	margin?: string;
}

function CardDescription({ houseInfo }: HouseInfoProps) {
	const userName = useSelector((state: RootStateOrAny) => state.userInfo.username);
	const startChat = () => {};
	const setBookmark = () => {};
	const deleteArticle = (id: number) => {
		articleApi.deleteArticle(id);
	};
	const editArticle = (id: number) => {
		// 수정 페이지로 이동
	};
	return (
		<Container>
			<Div>
				<SaleType>{houseInfo.sale_type}</SaleType>
				<Text>{houseInfo.username}</Text>
			</Div>
			<Price>
				{houseInfo.contract_type} {changeMoneyUnit((houseInfo.monthly_rent / 10000).toString())}
			</Price>
			<Text margin="true">{houseInfo.jibun_address}</Text>
			<div>
				<IconPart
					content1="house_type"
					content2="period"
					info1={houseInfo.house_type}
					info2={changeMonthToYear(houseInfo.period.toString())}
				/>
				<IconPart
					content1="floor"
					content2="price"
					info1={`${houseInfo.floor}층`}
					info2={`월 ${houseInfo.maintenance_fee / 10000}만원`}
				/>
				<Hr />
			</div>
			<ButtonDiv>
				{userName === houseInfo.username ? (
					<>
						<Button onClick={() => editArticle(houseInfo.house_id)}>수정</Button>
						<Button onClick={() => deleteArticle(houseInfo.house_id)}>삭제</Button>
					</>
				) : (
					<>
						<Link
							href={{ pathname: "/createSale", query: { id: houseInfo.house_id } }}
							as={`/updateArticle/${houseInfo.house_id}`}
						>
							<Button onClick={startChat}>채팅 하기</Button>
						</Link>
						<Button onClick={setBookmark}>북마크</Button>
					</>
				)}
			</ButtonDiv>
		</Container>
	);
}

export default CardDescription;

const Container = styled.div`
	width: 35rem;
	border: 1px solid ${(props) => props.theme.borderColor};
	height: 40rem;
	padding: 2rem;
	position: sticky;
	top: 10rem;
`;

const SaleType = styled.h1`
	font-size: 3rem;
	font-weight: bold;
	margin-right: 3rem;
`;

const Text = styled.p<TextProp>`
	font-size: 1.5rem;
	margin-bottom: ${({ margin }) => margin && "4rem"};
`;

const Div = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 4rem;
`;

const Hr = styled.hr`
	background-color: #fff;
	border-color: #fff;
`;

const Button = styled.button`
	width: 14rem;
	height: 4rem;
	border: none;
	background-color: ${(props) => props.theme.mainColor};
	color: #fff;
	cursor: pointer;
	margin-right: 1rem;
	font-size: 1.8rem;
	text-align: center;
`;

const ButtonDiv = styled.div`
	width: 100%;
	display: flex;
	margin-top: 2rem;
	justify-content: center;
`;

const Price = styled.p`
	font-size: 1.8rem;
	font-weight: bold;
	margin-bottom: 1rem;
`;

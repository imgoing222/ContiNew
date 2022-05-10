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
		if (window.confirm("정말로 해당 글을 삭제하시겠습니까?")) {
			articleApi.deleteArticle(id);
			window.location.replace("/saleList");
		}
	};
	const editArticle = (id: number) => {
		// 수정 페이지로 이동
	};
	return (
		<Container>
			<Div>
				<SaleType>{houseInfo.saleType}</SaleType>
				<Text>{houseInfo.username}</Text>
			</Div>
			<Price>
				{houseInfo.contractType} {changeMoneyUnit((houseInfo.monthlyRent / 10000).toString())}
			</Price>
			<Text margin="true">{houseInfo.jibunAddress}</Text>
			<div>
				<IconPart
					content1="house_type"
					content2="period"
					info1={houseInfo.houseType}
					info2={changeMonthToYear(houseInfo.period.toString())}
				/>
				<IconPart
					content1="floor"
					content2="price"
					info1={`${houseInfo.floor}층`}
					info2={`월 ${houseInfo.maintenanceFee / 10000}만원`}
				/>
				<Hr />
			</div>
			<ButtonDiv>
				{userName === houseInfo.username ? (
					<>
						<Link
							href={{ pathname: "/createSale", query: { id: houseInfo.houseId } }}
							as={`/updateArticle/${houseInfo.houseId}`}
						>
							<Button onClick={() => editArticle(houseInfo.houseId)}>수정</Button>
						</Link>
						<Button onClick={() => deleteArticle(houseInfo.houseId)}>삭제</Button>
					</>
				) : (
					<>
						<Button onClick={startChat}>채팅 하기</Button>

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

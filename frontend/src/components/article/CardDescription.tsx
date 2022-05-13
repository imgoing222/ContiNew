import Link from "next/link";
import styled from "styled-components";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeMonthToYear, moneyUnitChange } from "@utils/index";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import articleApi from "src/api/article";
import { HouseInfoProps } from "src/pages/article/[id]";
import IconPart from "./IconPart";
import { chatApi } from "src/api";
import { SET_ARTICLEID } from "src/store/articleId";
import { useRouter } from "next/router";

interface TextProp {
	margin?: string;
}

function CardDescription({ houseInfo }: HouseInfoProps) {
	const dispatch = useDispatch();
	const router = useRouter();
	const userName = useSelector((state: RootStateOrAny) => state.userInfo.username);

	const startChat = async () => {
		try {
			const chatDataSet = { buyer: userName, seller: houseInfo.username, sale: houseInfo.houseId };
			const res = await chatApi.createChattingRoom(chatDataSet);
			dispatch(SET_ARTICLEID(chatDataSet.sale));
			toChattingRoom(res.data.id);
		} catch (error) {
			console.log(error);
		}
	};
	const toChattingRoom = (roomId: string) => {
		router.push(`/chat/${roomId}`);
		localStorage.setItem("RoomId", roomId);
	};
	const setBookmark = () => {
		articleApi.addBookmark(houseInfo.houseId);
	};
	const deleteArticle = (id: number) => {
		if (window.confirm("정말로 해당 글을 삭제하시겠습니까?")) {
			articleApi.deleteArticle(id);
			window.location.replace("/saleList");
		}
	};

	return (
		<Container>
			<Div>
				<SaleType>{houseInfo.saleType}</SaleType>
				<Text>{houseInfo.username}</Text>
				{houseInfo.phoneAuth ? <AuthorizedIcon icon={faIdCard} /> : <AuthorText>미인증</AuthorText>}
			</Div>
			<Price>
				{houseInfo.contractType}{" "}
				{houseInfo.contractType === "월세"
					? moneyUnitChange(houseInfo.monthlyRent.toString())
					: moneyUnitChange(houseInfo.deposit.toString())}
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
					info1={houseInfo.floor === 0 ? "반지하" : `${houseInfo.floor}층`}
					info2={`월 ${houseInfo.maintenanceFee}만원`}
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
							<Button>수정</Button>
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

const AuthorizedIcon = styled(FontAwesomeIcon)`
	width: 2rem;
	height: 2rem;
	margin-left: 1rem;
`;

const AuthorText = styled.p`
	margin-left: 1rem;
	font-size: 0.9rem;
	color: gray;
`;

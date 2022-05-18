import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { chatApi, articleApi } from "src/api";
import { SET_ARTICLEINFO } from "src/store/articleInfo";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { CardProps } from "./CardDescription";
import cookie from "react-cookies";

function CardButton({ houseInfo, isBookmark, setIsBookmark }: CardProps) {
	const dispatch = useDispatch();
	const router = useRouter();
	const { login_id, username } = useSelector((state: RootStateOrAny) => state.userInfo);
	const accessToken = cookie.load("access_token");

	const startChat = async () => {
		try {
			const chatDataSet = {
				buyer: username,
				buyer_id: login_id,
				seller: houseInfo.username,
				seller_id: houseInfo.loginId,
				sale: houseInfo.houseId,
			};
			const res = await chatApi.createChattingRoom(chatDataSet);
			dispatch(SET_ARTICLEINFO(chatDataSet));
			toChattingRoom(res.data.id);
		} catch (error) {
			console.log(error);
		}
	};
	const toChattingRoom = (roomId: string) => {
		if (!accessToken) return router.push("/account/signin");
		router.push(`/chat/${roomId}`);
		localStorage.setItem("RoomId", roomId);
	};
	const setBookmark = async () => {
		if (!accessToken) return router.push("/account/signin");

		const res = await articleApi.addBookmark(houseInfo.houseId);
		if (res.status === 204) {
			toast.success("관심매물에 등록하였습니다.");
			return setIsBookmark(!isBookmark);
		}
		if ((res as unknown as string) === "L01") {
			articleApi.deleteBookmark(houseInfo.houseId);
			setIsBookmark(!isBookmark);
			return toast.warn("관심매물에서 삭제하였습니다.");
		}
	};
	const deleteArticle = (id: number) => {
		if (window.confirm("정말로 해당 글을 삭제하시겠습니까?")) {
			articleApi.deleteArticle(id);
			window.location.replace("/saleList");
		}
	};

	return (
		<ButtonDiv>
			{username === houseInfo.username ? (
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
					<Button onClick={setBookmark}>
						{isBookmark ? (
							<FontAwesomeIcon icon={faBookmark} color="#000" />
						) : (
							<FontAwesomeIcon icon={faBookmark} />
						)}
					</Button>
				</>
			)}
		</ButtonDiv>
	);
}

export default CardButton;

const ButtonDiv = styled.div`
	width: 100%;
	display: flex;
	margin-top: 2rem;
	justify-content: center;
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
	@media ${(props) => props.theme.mobile} {
		font-size: 1.5rem;
		width: 10rem;
		height: 3.5rem;
	}
`;

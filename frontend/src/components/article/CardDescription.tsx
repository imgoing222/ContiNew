import styled from "styled-components";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeMonthToYear, moneyUnitChange } from "@utils/index";
import { HouseInfoProps } from "src/pages/article/[id]";
import IconPart from "./IconPart";
import CardButton from "./CardButton";
import cookie from "react-cookies";
import { Dispatch, SetStateAction } from "react";

interface TextProp {
	margin?: string;
}
export interface CardProps extends HouseInfoProps {
	isBookmark: boolean;
	setIsBookmark: Dispatch<SetStateAction<boolean>>;
}

function CardDescription({ houseInfo, isBookmark, setIsBookmark }: CardProps) {
	const accessToken = cookie.load("access_token");

	return (
		<Container>
			<Div>
				<SaleType>{houseInfo.saleType}</SaleType>
				<Text>{houseInfo.username}</Text>
				{houseInfo.phoneAuth ? <AuthorizedIcon icon={faIdCard} /> : <AuthorText>미인증</AuthorText>}
			</Div>
			<Price>
				{houseInfo.contractType}
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
			{accessToken && (
				<CardButton houseInfo={houseInfo} isBookmark={isBookmark} setIsBookmark={setIsBookmark} />
			)}
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
	@media ${(props) => props.theme.mobile} {
		width: 25rem;
		height: 34rem;
	}
`;

const SaleType = styled.h1`
	font-size: 3rem;
	font-weight: bold;
	margin-right: 3rem;
	@media ${(props) => props.theme.mobile} {
		font-size: 1.8rem;
	}
`;

const Text = styled.p<TextProp>`
	font-size: 1.5rem;
	margin-bottom: ${({ margin }) => margin && "4rem"};
	@media ${(props) => props.theme.mobile} {
		font-size: 1.3rem;
	}
`;

const Div = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 4rem;
	@media ${(props) => props.theme.mobile} {
		margin-bottom: 2rem;
	}
`;

const Hr = styled.hr`
	background-color: #fff;
	border-color: #fff;
`;

const Price = styled.p`
	font-size: 1.8rem;
	font-weight: bold;
	margin-bottom: 1rem;
	@media ${(props) => props.theme.mobile} {
		font-size: 1.5rem;
	}
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

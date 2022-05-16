import React from "react";
import { SaleListProps } from "./SaleList";
import { moneyUnitChange } from "@utils/index";
import Link from "next/link";
import styled from "styled-components";

interface TextProp {
	fontSize?: number;
	bold?: boolean;
	color?: string;
}

function DetailOfSale({ saleList }: SaleListProps) {
	return (
		<>
			{saleList.map((item, idx) => (
				<Link
					href={{ pathname: `/article/${item.house_id}`, query: { id: item.house_id } }}
					key={idx}
				>
					<Box key={idx}>
						<MainImg src={item.main_image}></MainImg>
						<TextBox>
							<Text fontSize={1.6} bold={true}>
								{item.contract_type} {moneyUnitChange(item.deposit.toString())}
								{item.contract_type === "월세" &&
									"/ " + moneyUnitChange(item.monthly_rent.toString())}
							</Text>
							<Text fontSize={1.2}>{item.house_type}</Text>
							<Text fontSize={1.2}>
								{item.sido_name} {item.gungu_name} {item.dong_name}
							</Text>
							<Text fontSize={1.2}>
								{item.floor}층 {moneyUnitChange(item.monthly_rent.toString())}
							</Text>
							<Text fontSize={1.2}>
								{item.description.length > 24
									? item.description.slice(0, 24) + "..."
									: item.description}
							</Text>
						</TextBox>
					</Box>
				</Link>
			))}
		</>
	);
}

export default DetailOfSale;

const Box = styled.div`
	display: flex;
	margin-bottom: 1.5rem;
	cursor: pointer;
	@media ${(props) => props.theme.mobile} {
		margin-bottom: 1rem;
	}
`;

const MainImg = styled.img`
	width: 12rem;
	height: 13rem;
	margin-right: 1rem;
	@media ${(props) => props.theme.mobileS} {
		width: 10rem;
		height: 10rem;
	}
	@media ${(props) => props.theme.mobileXS} {
		width: 7rem;
		height: 7rem;
	}
`;

const TextBox = styled.div`
	display: flex;
	flex-direction: column;
`;

const Text = styled.p<TextProp>`
	font-size: ${({ fontSize }) => (fontSize ? +fontSize + "rem" : "1.3rem")};
	font-weight: ${({ bold }) => bold && "bold"};
	margin-bottom: 0.5rem;
	@media ${(props) => props.theme.mobile} {
		font-size: ${({ fontSize }) => (fontSize ? "1.3rem" : "1rem")};
	}
	@media ${(props) => props.theme.mobileXS} {
		font-size: 0.7rem;
		margin-bottom: 0;
	}
`;

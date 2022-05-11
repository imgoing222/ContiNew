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
								{item.contractType} {moneyUnitChange(item.deposit.toString())}
								{item.contractType === "월세" &&
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
`;

const MainImg = styled.img`
	width: 12rem;
	height: 13rem;
	margin-right: 1rem;
`;

const TextBox = styled.div`
	display: flex;
	flex-direction: column;
`;

const Text = styled.p<TextProp>`
	font-size: ${({ fontSize }) => (fontSize ? +fontSize + "rem" : "1.3rem")};
	font-weight: ${({ bold }) => bold && "bold"};
	margin-bottom: 0.5rem;
`;

import { useRouter } from "next/router";
import styled from "styled-components";

import House from "src/types/getListType";

interface HouseType {
	house: House;
}

function RecommendItem({ house }: HouseType) {
	const router = useRouter();

	return (
		<Li onClick={() => router.push(`/article/${house.house_id}`)}>
			<Image src={house.main_image} alt="house-img" />
			<Content>
				<SaleType>
					{house.contract_type} {house.deposit}
					{house.monthly_rent && <span>/{house.monthly_rent}</span>}
				</SaleType>
				<Fee>관리비 : {house.maintenance_fee} 만 원</Fee>
				<Text>{house.description}</Text>
			</Content>
		</Li>
	);
}

const Li = styled.li`
	margin: 10px;
	cursor: pointer;
`;

const Image = styled.img`
	width: 280px;
	height: 180px;
`;

const Content = styled.div`
	width: 280px;
	display: flex;
	flex-direction: column;
`;

const SaleType = styled.h1`
	font-size: 2.3rem;
	font-weight: bold;
`;

const Fee = styled.h3`
	padding-bottom: 1rem;
	font-size: 1.5rem;
`;

const Text = styled.div`
	font-size: 2rem;
	color: #a9a9a9;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`;

export default RecommendItem;

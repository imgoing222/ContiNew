import styled from "styled-components";
import PriceInfoList from "./PriceInfoList";

function PriceInfo() {
	const houseInfo = {
		address_detail: "스카이빌",
		contract_type: "전세",
		deposit: 10000000,
		description: "6개월 짜리 방 내놓습니다",
		house_id: 1,
		house_type: "원룸",
		images: ["string"],
		jibun_address: "서울 동대문구 이문동 294-295",
		maintenance_detail: "전기요금",
		maintenance_fee: 50000,
		monthly_rent: 500000,
		options: [1, 2, 3],
		period: 6,
		phone_auth: true,
		sale_type: "이어살기",
		username: "채채퐁",
	};

	return (
		<Container>
			<Title>가격정보</Title>
			<PriceInfoList
				name={houseInfo.contract_type}
				content={
					houseInfo.contract_type === "월세"
						? houseInfo.monthly_rent / 10000 + "/" + houseInfo.maintenance_fee / 10000
						: houseInfo.deposit / 10000 + " 만원"
				}
			/>
			<PriceInfoList
				name="관리비"
				content={`매월 ${houseInfo.maintenance_fee / 10000}만원`}
				content2={houseInfo.maintenance_detail}
				div={true}
			/>
			<PriceInfoList name="주차" content={houseInfo.options.includes(9) ? "가능" : "불가능"} />
			<PriceInfoList
				name="한달 예상 주거비용"
				content={`${houseInfo.monthly_rent / 10000 + houseInfo.maintenance_fee / 10000}+a 만원`}
				content2="월세+관리비+a"
				div={true}
				price={true}
			/>
		</Container>
	);
}

export default PriceInfo;

const Container = styled.section`
	display: flex;
	flex-direction: column;
`;

const Title = styled.h1`
	font-size: 2.5rem;
	margin-bottom: 3rem;
`;

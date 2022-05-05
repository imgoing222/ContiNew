import styled from "styled-components";

interface Price {
	color?: string;
}
function PriceInfo() {
	const houseInfo = {
		address_detail: "스카이빌",
		contract_type: "월세",
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
			<Li>
				<Name>{houseInfo.contract_type}</Name>
				<Content>
					{houseInfo.monthly_rent / 10000 + "/" + houseInfo.maintenance_fee / 10000}
				</Content>
			</Li>
			<Li>
				<Name>관리비</Name>
				<div>
					<Content>매월 {houseInfo.maintenance_fee / 10000}만원</Content>
					<Content>{houseInfo.maintenance_detail}</Content>
				</div>
			</Li>
			<Li>
				<Name>주차</Name>
				<Content>{houseInfo.options.includes(9) ? "가능" : "불가능"}</Content>
			</Li>
			<Li>
				<Name>
					한달
					<br /> 예상주거비용
				</Name>
				<div>
					<Content color="price">
						{houseInfo.monthly_rent / 10000 + houseInfo.maintenance_fee / 10000}+a 만원
					</Content>
					<Content>월세+관리비+a</Content>
				</div>
			</Li>
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

const Name = styled.p`
	width: 20rem;
	font-size: 1.8rem;
	font-weight: bold;
`;

const Li = styled.li`
	display: flex;
	padding: 1.5rem 0;
	border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const Content = styled.p<Price>`
	font-size: 1.6rem;
	color: ${(props) => props.color && props.theme.mainColor};
	font-weight: ${(props) => props.color && "700"}; ;
`;

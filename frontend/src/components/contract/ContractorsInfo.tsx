import BuyerInfo from "./BuyerInfo";
import { Section } from "./Section";
import SellerInfo from "./SellerInfo";
import styled from "styled-components";

function ContractorsInfo() {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const date = now.getDate();

	return (
		<>
			<p>본 계약을 증명하기 위하여 계약 당사자가 이의 없음을 확인하고 각각 서명 또는 날인한다.</p>
			<Section>
				<SellerInfo />
				<BuyerInfo />
				<ContractionDate>
					{year}년 {month}월 {date}일
				</ContractionDate>
			</Section>
		</>
	);
}

const ContractionDate = styled.p`
	font-size: 1.5rem;
	text-align: end;
`;
export default ContractorsInfo;

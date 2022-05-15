import BuyerInfo from "./BuyerInfo";
import { Section } from "./Section";
import SellerInfo from "./SellerInfo";
import styled from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { ContractType } from "src/types/contractType";

function ContractorsInfo() {
	// 오늘 날짜 가져오는거 함수로 빼기
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const date = now.getDate();

	const contract = useSelector((state: RootState) => state.contractInfo);
	const contractInfo: ContractType = contract["contract"];
	const step = contract["step"]["current_step"];
	const role = contract["role"]["user_role"];

	return (
		<>
			<p>본 계약을 증명하기 위하여 계약 당사자가 이의 없음을 확인하고 각각 서명 또는 날인한다.</p>
			<Section>
				<SellerInfo step={step} role={role} contractInfo={contractInfo} />
				<BuyerInfo step={step} role={role} contractInfo={contractInfo} />
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

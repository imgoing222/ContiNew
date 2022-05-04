import { EventProps } from "src/pages/createSale";
import { Container } from "../Container";
import { InputText } from "../index";
import { Text } from "../Table";
import { TableRowAndDivBox } from "../TableRow";
import styled from "styled-components";
import SaleInfoComponent from "../SaleInfoComponent";

function PriceInfo({ changeEvent, houseInfo }: EventProps) {
	const contractType = ["전세", "월세"];

	const changeMoneyUnit = (money: string) => {
		if (money) {
			const len = money.length;
			if (money.length > 4) return ` ${money.slice(0, len - 4)}억 ${money.slice(len - 4)}만원`;
			return `${money} 만원`;
		}
		return "";
	};

	const changeMonthToYear = (month: string) => {
		if (month) {
			if (+month > 12)
				return `${Math.floor(+month / 12)}년  ${+month % 12 > 0 ? (+month % 12) + "개월" : ""}`;
			return `${month}개월`;
		}
		return "";
	};

	return (
		<Container title="거래정보">
			<TableRowAndDivBox title="계약 정보">
				{contractType.map((contract, idx) => (
					<SaleInfoComponent
						value={contract}
						houseInfo={houseInfo}
						changeEvent={changeEvent}
						type="contractType"
						key={idx}
					/>
				))}
			</TableRowAndDivBox>
			{houseInfo.contractType === "월세" && (
				<TableRowAndDivBox title="가격 정보">
					<InputText
						type="text"
						name="deposit"
						onChange={changeEvent}
						value={houseInfo.deposit}
						placeholder="보증금"
					/>
					<Text> / </Text>
					<InputText
						type="text"
						name="monthlyRent"
						onChange={changeEvent}
						value={houseInfo.monthlyRent}
						placeholder="월세"
					/>
					<Text> 만원 </Text>
					<MoneyText>{`${changeMoneyUnit(houseInfo.deposit)} / ${changeMoneyUnit(
						houseInfo.monthlyRent,
					)}`}</MoneyText>
				</TableRowAndDivBox>
			)}
			{houseInfo.contractType === "전세" && (
				<TableRowAndDivBox title="가격 정보">
					<InputText
						type="text"
						name="deposit"
						onChange={changeEvent}
						value={houseInfo.deposit}
						placeholder="전세"
					/>
					<Text> / </Text>
					<Text> 만원 </Text>
					<MoneyText>{`${changeMoneyUnit(houseInfo.deposit)}`}</MoneyText>
				</TableRowAndDivBox>
			)}

			<TableRowAndDivBox title="관리비">
				<InputText
					type="text"
					name="maintenanceFee"
					onChange={changeEvent}
					value={houseInfo.maintenanceFee}
					placeholder="관리비"
				/>
				<Text> 만원 </Text>
				<InputText
					type="text"
					name="maintenanceDetail"
					onChange={changeEvent}
					value={houseInfo.maintenanceDetail}
					placeholder="관리비 포함 항목"
					width={55}
					margin={5}
				/>
			</TableRowAndDivBox>

			<TableRowAndDivBox title="임대기간">
				<InputText
					type="text"
					name="period"
					onChange={changeEvent}
					value={houseInfo.period}
					placeholder="임대기간"
				/>
				<Text> 개월 </Text>
				<MoneyText>{`${changeMonthToYear(houseInfo.period)}`}</MoneyText>
			</TableRowAndDivBox>
		</Container>
	);
}

export default PriceInfo;

const MoneyText = styled.p`
	margin-left: 3rem;
	color: gray;
	font-size: 1.25rem;
`;

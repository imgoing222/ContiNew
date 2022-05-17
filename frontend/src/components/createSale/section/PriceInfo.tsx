import { EventProps } from "src/pages/createSale";
import { Container } from "../Container";
import { InputText } from "../index";
import { Text } from "../Table";
import { TableRow, TableRowAndDivBox } from "../TableRow";
import styled from "styled-components";
import SaleInfoComponent from "../SaleInfoComponent";
import changeMoneyUnit from "@utils/moneyUnitChange";
import changeMonthToYear from "@utils/changeMonthToYear";

function PriceInfo({ changeEvent, houseInfo }: EventProps) {
	const contractType = ["전세", "월세"];

	return (
		<Container title="거래정보">
			<TableRow title="계약 정보">
				{contractType.map((contract, idx) => (
					<SaleInfoComponent
						value={contract}
						houseInfo={houseInfo}
						changeEvent={changeEvent}
						type="contractType"
						key={idx}
					/>
				))}
			</TableRow>
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
						placeholder="월세 금액"
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
						placeholder="전세 금액"
					/>
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
					width={30}
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
	@media ${(props) => props.theme.mobile} {
		display: none;
	}
`;

import { EventProps } from "src/pages/createSale";
import { Container } from "../Container";
import SaleInfoComponent from "../SaleInfoComponent";
import { TableRow } from "../TableRow";

function SaleInfo({ changeEvent, houseInfo }: EventProps) {
	const saleType = ["이어살기", "쉐어하우스"];
	const houseType = ["원룸", "투룸", "쓰리룸"];
	return (
		<Container title="매물정보">
			<TableRow title="매물 정보">
				{saleType.map((sale, idx) => (
					<SaleInfoComponent
						value={sale}
						houseInfo={houseInfo}
						changeEvent={changeEvent}
						type="saleType"
						key={idx}
					/>
				))}
			</TableRow>
			<TableRow title="종류 선택">
				{houseType.map((room, idx) => (
					<SaleInfoComponent
						value={room}
						houseInfo={houseInfo}
						changeEvent={changeEvent}
						type="houseType"
						key={idx}
					/>
				))}
			</TableRow>
		</Container>
	);
}

export default SaleInfo;

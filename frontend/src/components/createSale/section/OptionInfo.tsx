import { EventProps } from "src/pages/createSale";
import { Container } from "../Container";
import { TableRow } from "../TableRow";
import OptionInfoList from "../OptionInfoList";

function OptionInfo({ changeEvent, houseInfo }: EventProps) {
	const options = [
		"에어컨",
		"세탁기",
		"TV",
		"냉장고",
		"가스레인지",
		"인덕션",
		"전자레인지",
		"책상",
		"주차장",
	];

	return (
		<Container title="옵션 정보">
			<TableRow title="옵션항목">
				{options.map((option, idx) => (
					<OptionInfoList
						title={option}
						value={idx + 1}
						changeEvent={changeEvent}
						houseInfo={houseInfo}
						key={idx}
					/>
				))}
			</TableRow>
		</Container>
	);
}
export default OptionInfo;

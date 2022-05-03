import { EventProps } from "src/pages/createSale";
import { Container } from "../Container";
import { InputCheck } from "../index";
import { Label, Pbox } from "../Table";
import TableRow from "../TableRow";

function OptionInfo({ changeEvent, houseInfo }: EventProps) {
	return (
		<Container title="옵션 정보">
			<TableRow title="옵션항목">
				<li>
					<Label htmlFor="options">
						<InputCheck name="options" type="checkbox" value="1" onChange={changeEvent} />
						<Pbox isCheck={houseInfo.options.includes("1") ? "checked" : undefined}>에어컨</Pbox>
					</Label>
				</li>
				<li>
					<Label htmlFor="options">
						<InputCheck name="options" type="checkbox" value="2" onChange={changeEvent} />
						<Pbox isCheck={houseInfo.options.includes("2") ? "checked" : undefined}>세탁기</Pbox>
					</Label>
				</li>
				<li>
					<Label htmlFor="options">
						<InputCheck name="options" type="checkbox" value="3" onChange={changeEvent} />
						<Pbox isCheck={houseInfo.options.includes("3") ? "checked" : undefined}>TV</Pbox>
					</Label>
				</li>
				<li>
					<Label htmlFor="options">
						<InputCheck name="options" type="checkbox" value="4" onChange={changeEvent} />
						<Pbox isCheck={houseInfo.options.includes("4") ? "checked" : undefined}>냉장고</Pbox>
					</Label>
				</li>
				<li>
					<Label htmlFor="options">
						<InputCheck name="options" type="checkbox" value="5" onChange={changeEvent} />
						<Pbox isCheck={houseInfo.options.includes("5") ? "checked" : undefined}>
							가스레인지
						</Pbox>
					</Label>
				</li>

				<li>
					<Label htmlFor="options">
						<InputCheck name="options" type="checkbox" value="6" onChange={changeEvent} />
						<Pbox isCheck={houseInfo.options.includes("6") ? "checked" : undefined}>인덕션</Pbox>
					</Label>
				</li>
				<li>
					<Label htmlFor="options">
						<InputCheck name="options" type="checkbox" value="7" onChange={changeEvent} />
						<Pbox isCheck={houseInfo.options.includes("7") ? "checked" : undefined}>
							전자레인지
						</Pbox>
					</Label>
				</li>
				<li>
					<Label htmlFor="options">
						<InputCheck name="options" type="checkbox" value="8" onChange={changeEvent} />
						<Pbox isCheck={houseInfo.options.includes("8") ? "checked" : undefined}>책상</Pbox>
					</Label>
				</li>
				<li>
					<Label htmlFor="options">
						<InputCheck name="options" type="checkbox" value="9" onChange={changeEvent} />
						<Pbox isCheck={houseInfo.options.includes("9") ? "checked" : undefined}>주차장</Pbox>
					</Label>
				</li>
			</TableRow>
		</Container>
	);
}
export default OptionInfo;

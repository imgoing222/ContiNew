import { HouseInfo } from "src/types/houseInfo";
import InputCheck from "./InputCheck";
import { Label, Pbox } from "./Table";

export interface OptionInfoListProps {
	value: string;
	changeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
	title: string;
	houseInfo: HouseInfo;
}

function OptionInfoList({ value, changeEvent, title, houseInfo }: OptionInfoListProps) {
	return (
		<li>
			<Label htmlFor="options">
				<InputCheck name="options" type="checkbox" value={value} onChange={changeEvent} />
				<Pbox isCheck={houseInfo.options.includes(value) ? "checked" : undefined}>{title}</Pbox>
			</Label>
		</li>
	);
}

export default OptionInfoList;

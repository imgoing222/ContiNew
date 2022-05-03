import React from "react";
import { HouseInfo } from "src/types/houseInfo";
import { InputRadio, Label, Pbox } from "./Table";

interface SaleInfoComponentProps {
	value: string;
	changeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
	houseInfo: HouseInfo;
}

function SaleInfoComponent({ value, houseInfo, changeEvent }: SaleInfoComponentProps) {
	return (
		<li>
			<Label htmlFor="saleType">
				<InputRadio
					type="radio"
					name="saleType"
					value={value}
					checked={houseInfo.saleType === value}
					onChange={changeEvent}
				/>
				<Pbox isCheck={houseInfo.saleType === value ? "checked" : undefined}>{value}</Pbox>
			</Label>
		</li>
	);
}

export default SaleInfoComponent;

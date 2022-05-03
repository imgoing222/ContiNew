import React from "react";
import { OptionInfoListProps } from "./OptionInfoList";
import { InputRadio, Label, Pbox } from "./Table";

function SaleInfoComponent({ value, title, houseInfo, changeEvent }: OptionInfoListProps) {
	return (
		<li>
			<Label htmlFor="saleType">
				<InputRadio
					type="radio"
					name="saleType"
					value={value}
					checked={houseInfo.saleType === title}
					onChange={changeEvent}
				/>
				<Pbox isCheck={houseInfo.saleType === title ? "checked" : undefined}>{title}</Pbox>
			</Label>
		</li>
	);
}

export default SaleInfoComponent;

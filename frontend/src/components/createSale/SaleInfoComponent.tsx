import React from "react";
import { HouseInfo } from "src/types/houseInfo";
import { InputRadio, Label, Pbox } from "./Table";

interface SaleInfoComponentProps {
	value: string;
	changeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
	houseInfo: HouseInfo;
	type: string;
}

function SaleInfoComponent({ value, houseInfo, changeEvent, type }: SaleInfoComponentProps) {
	return (
		<li>
			<Label htmlFor={type}>
				<InputRadio
					type="radio"
					name={type}
					value={value}
					checked={
						type === "saleType" ? houseInfo.saleType === value : houseInfo.houseType === value
					}
					onChange={changeEvent}
				/>
				<Pbox
					isCheck={
						type === "saleType"
							? houseInfo.saleType === value
								? "checked"
								: undefined
							: houseInfo.houseType === value
							? "checked"
							: undefined
					}
				>
					{value}
				</Pbox>
			</Label>
		</li>
	);
}

export default SaleInfoComponent;

import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { SET_STEP1 } from "src/store/contract";
import { ContractType } from "src/types/contractType";
import { Input } from "./Input";
import { Label } from "./Label";
import { Section } from "./Section";

interface Props {
	disabled: boolean;
	contractInfo: ContractType;
}

function SaleInfo({ disabled, contractInfo }: Props) {
	const dispatch = useDispatch();

	const handleSaleInfoChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		dispatch(SET_STEP1({ ...contractInfo, [name]: value }));
		console.log(value);
	}, 500);

	return (
		<>
			<h2>&#91;임대차목적물의 표시&#93;</h2>
			<Section>
				<Label>소재지</Label>
				<Input
					name="location"
					disabled={disabled}
					onChange={handleSaleInfoChange}
					defaultValue={contractInfo.location}
				/>
				<Label>면적</Label>
				<Input
					name="area"
					type="number"
					disabled={disabled}
					defaultValue={contractInfo.area}
					onChange={handleSaleInfoChange}
				/>
				<Label>전용면적</Label>
				<Input
					name="net_leasable_area"
					type="number"
					disabled={disabled}
					defaultValue={contractInfo.net_leasable_area}
					onChange={handleSaleInfoChange}
				/>
			</Section>
		</>
	);
}

export default SaleInfo;

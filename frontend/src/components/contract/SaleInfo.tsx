import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { ContractType } from "src/types/contractType";
import { Input } from "./Input";
import { Label } from "./Label";
import { Section } from "./Section";

interface Props {
	disabled: boolean;
	contractInfo: ContractType;
}

function SaleInfo({ disabled, contractInfo }: Props) {
	const handleSaleInfoChange = () => {};
	return (
		<>
			<h2>&#91;임대차목적물의 표시&#93;</h2>
			<Section>
				<Label>소재지</Label>
				<Input disabled={disabled} value={contractInfo.location} onChange={handleSaleInfoChange} />
				<Label>면적</Label>
				<Input
					type="number"
					disabled={disabled}
					value={contractInfo.area}
					onChange={handleSaleInfoChange}
				/>
				<Label>전용면적</Label>
				<Input
					type="number"
					disabled={disabled}
					value={contractInfo.net_leasable_area}
					onChange={handleSaleInfoChange}
				/>
			</Section>
		</>
	);
}

export default SaleInfo;

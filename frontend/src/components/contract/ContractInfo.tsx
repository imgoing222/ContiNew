import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { SET_STEP1 } from "src/store/contract";
import { ContractType } from "src/types/contractType";
import ContractTerms from "./ContractTerms";
import { Input, RadioInput } from "./Input";
import { Label } from "./Label";
import { Section } from "./Section";
interface Props {
	disabled: boolean;
	contractInfo: ContractType;
}

function ContractInfo({ disabled, contractInfo }: Props) {
	const dispatch = useDispatch();

	const handleContractInfoChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		dispatch(SET_STEP1({ ...contractInfo, [name]: value }));
		console.log(value);
	}, 500);

	return (
		<>
			<h2>&#91;임차인의 임대차계약 현황&#93;</h2>
			<Section>
				<Label>계약종류</Label>
				<Label htmlFor="전세">전세</Label>
				<RadioInput
					type="radio"
					id="전세"
					name="contract_type"
					disabled={disabled}
					defaultChecked={contractInfo.contract_type === "전세"}
					onChange={handleContractInfoChange}
				/>
				<Label htmlFor="월세">월세</Label>
				<RadioInput
					type="radio"
					id="월세"
					name="contract_type"
					disabled={disabled}
					defaultChecked={contractInfo.contract_type === "월세"}
					onChange={handleContractInfoChange}
				/>
				<Label>임차보증금</Label>
				<Input disabled={disabled} name="tenancy_deposit" onChange={handleContractInfoChange} />
				<Label>관리비</Label>
				<Input disabled={disabled} name="maintenance_fee" onChange={handleContractInfoChange} />
				<Label>계약 기간</Label>
				<Input
					type="date"
					disabled={disabled}
					name="contract_start"
					onChange={handleContractInfoChange}
				/>
				<Input
					type="date"
					disabled={disabled}
					name="contract_end"
					onChange={handleContractInfoChange}
				/>
			</Section>
			<h2>&#91;계약내용&#93;</h2>
			<p>제1조&#40;권리금의 지급&#41; 신규임차인은 임차인에게 다음과 같이 권리금을 지급한다.</p>
			<Section>
				<Label>총 권리금</Label>
				<Input disabled={disabled} name="total_premium" onChange={handleContractInfoChange} />
				<Label>계약금</Label>
				<Input disabled={disabled} name="down_payment" onChange={handleContractInfoChange} />
				<Label>중도금</Label>
				<Input disabled={disabled} name="middle_payment" onChange={handleContractInfoChange} />
				<Label>중도금 기한</Label>
				<Input
					type="date"
					disabled={disabled}
					name="middle_date"
					onChange={handleContractInfoChange}
				/>
				<Label>잔금</Label>
				<Input disabled={disabled} name="balance_payment" onChange={handleContractInfoChange} />
				<Label>잔금 기한</Label>
				<Input
					type="date"
					disabled={disabled}
					name="balance_date"
					onChange={handleContractInfoChange}
				/>
			</Section>
			<ContractTerms />
		</>
	);
}

export default ContractInfo;

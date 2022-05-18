import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { SET_STEP1 } from "src/store/contract";
import { ContractType } from "src/types/contractType";
import ContractTerms from "./ContractTerms";
import { Input, RadioInput } from "./Input";
import { Label } from "./Label";
import { Box, Container } from "./SaleInfo";
import { Section } from "./Section";
interface Props {
	disabled: boolean;
	contractInfo: ContractType;
}

function ContractInfo({ disabled, contractInfo }: Props) {
	const dispatch = useDispatch();

	const handleContractInfoChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		console.log(contractInfo);
		dispatch(SET_STEP1({ ...contractInfo, [name]: value }));
		console.log(value);
	}, 500);

	return (
		<>
			<h2>&#91;임차인의 임대차계약 현황&#93;</h2>
			<Section>
				<Container>
					<Box>
						<Label>계약종류</Label>
						<Label bold={true} htmlFor="전세" width={4}>
							전세
						</Label>
						<RadioInput
							type="radio"
							id="전세"
							name="contract_type"
							value="전세"
							disabled={disabled}
							defaultChecked={contractInfo.contract_type === "전세"}
							onChange={handleContractInfoChange}
						/>
						<Label bold={true} htmlFor="월세" width={4}>
							월세
						</Label>
						<RadioInput
							type="radio"
							id="월세"
							value="월세"
							name="contract_type"
							disabled={disabled}
							defaultChecked={contractInfo.contract_type === "월세"}
							onChange={handleContractInfoChange}
						/>
					</Box>
				</Container>
				<Container isJustify={true}>
					<Box>
						<Label>임차보증금</Label>
						<Input
							disabled={disabled}
							defaultValue={contractInfo.tenancy_deposit}
							name="tenancy_deposit"
							onChange={handleContractInfoChange}
							width={25}
						/>
					</Box>
					<Box>
						<Label>관리비</Label>
						<Input
							disabled={disabled}
							defaultValue={contractInfo.maintenance_fee}
							name="maintenance_fee"
							onChange={handleContractInfoChange}
							width={25}
						/>
					</Box>
				</Container>
				<Container>
					<Label>계약 기간</Label>
					<Input
						type="date"
						disabled={disabled}
						name="contract_start"
						defaultValue={contractInfo.contract_start}
						onChange={handleContractInfoChange}
						width={25}
						margin={3}
					/>
					<Input
						type="date"
						disabled={disabled}
						name="contract_end"
						defaultValue={contractInfo.contract_end}
						onChange={handleContractInfoChange}
						width={25}
					/>
				</Container>
			</Section>
			<h2>&#91;계약내용&#93;</h2>
			<p>제1조&#40;권리금의 지급&#41; 신규임차인은 임차인에게 다음과 같이 권리금을 지급한다.</p>
			<Section>
				<Container>
					<Label>총 권리금</Label>
					<Input
						disabled={disabled}
						name="total_premium"
						defaultValue={contractInfo.total_premium}
						onChange={handleContractInfoChange}
					/>
				</Container>
				<Container>
					<Label>계약금</Label>
					<Input
						disabled={disabled}
						name="down_payment"
						defaultValue={contractInfo.down_payment}
						onChange={handleContractInfoChange}
					/>
				</Container>
				<Container>
					<Label>중도금</Label>
					<Input
						disabled={disabled}
						name="middle_payment"
						defaultValue={contractInfo.middle_payment}
						onChange={handleContractInfoChange}
					/>
				</Container>
				<Container>
					<Label>중도금 기한</Label>
					<Input
						type="date"
						disabled={disabled}
						name="middle_date"
						defaultValue={contractInfo.middle_date}
						onChange={handleContractInfoChange}
					/>
				</Container>
				<Container>
					<Label>잔금</Label>
					<Input
						disabled={disabled}
						name="balance_payment"
						defaultValue={contractInfo.balance_payment}
						onChange={handleContractInfoChange}
					/>
				</Container>
				<Container>
					<Label>잔금 기한</Label>
					<Input
						type="date"
						disabled={disabled}
						name="balance_date"
						defaultValue={contractInfo.balance_date}
						onChange={handleContractInfoChange}
					/>
				</Container>
			</Section>
			<ContractTerms />
		</>
	);
}

export default ContractInfo;

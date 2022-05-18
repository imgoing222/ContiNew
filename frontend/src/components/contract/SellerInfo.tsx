import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SET_STEP1 } from "src/store/contract";
import { ContractType } from "src/types/contractType";
import { Input } from "./Input";
import { Label } from "./Label";
import Signature from "./Signature";
interface Props {
	step: number;
	role: string;
	contractInfo: ContractType;
}

function SellerInfo({ step, role, contractInfo }: Props) {
	const [disabled, setDisabled] = useState(true);
	const [signatureDisabled, setSignatureDisabled] = useState(true);

	const dispatch = useDispatch();

	const handleSellerInfoChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		dispatch(SET_STEP1({ ...contractInfo, [name]: value }));
		console.log(value);
	}, 500);

	useEffect(() => {
		if (step === 1 && role === "seller") {
			setDisabled(false);
		}
		if (step === 3 && role === "seller") {
			setSignatureDisabled(false);
		}
	}, [step]);

	return (
		<>
			<Label>임차인 주소</Label>
			<Input
				disabled={disabled}
				name="seller_address"
				defaultValue={contractInfo.seller_address}
				onChange={handleSellerInfoChange}
			/>
			<Label>임차인 성명</Label>
			<Input
				disabled={disabled}
				name="seller_name"
				defaultValue={contractInfo.seller_name}
				onChange={handleSellerInfoChange}
			/>
			<Label>임차인 생년월일</Label>
			<Input
				disabled={disabled}
				name="seller_birth"
				type="date"
				defaultValue={contractInfo.seller_birth}
				onChange={handleSellerInfoChange}
			/>
			<Label>임차인 전화</Label>
			<Input
				disabled={disabled}
				name="seller_phone"
				defaultValue={contractInfo.seller_phone}
				onChange={handleSellerInfoChange}
			/>
			<Label>서명</Label>
			<Signature signatureDisabled={signatureDisabled} role={role} from="sellerInfo" />
		</>
	);
}

export default SellerInfo;

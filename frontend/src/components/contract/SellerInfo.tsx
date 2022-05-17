import { useEffect, useState } from "react";
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
			<Input disabled={disabled} name="seller_address" />
			<Label>임차인 성명</Label>
			<Input disabled={disabled} name="seller_name" />
			<Label>임차인 생년월일</Label>
			<Input disabled={disabled} name="seller_birth" />
			<Label>임차인 전화</Label>
			<Input disabled={disabled} name="seller_phone" />
			<Label>서명</Label>
			<Signature signatureDisabled={signatureDisabled} role={role} />
		</>
	);
}

export default SellerInfo;

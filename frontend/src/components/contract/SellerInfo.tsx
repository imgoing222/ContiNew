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

	useEffect(() => {
		if (step === 1 && role === "seller") {
			setDisabled(false);
		}
	}, []);

	return (
		<>
			<Label>임차인 주소</Label>
			<Input disabled={disabled} />
			<Label>임차인 성명</Label>
			<Input disabled={disabled} />
			<Label>임차인 생년월일</Label>
			<Input disabled={disabled} />
			<Label>임차인 전화</Label>
			<Input disabled={disabled} />
			<Label>서명</Label>
			<Signature />
		</>
	);
}

export default SellerInfo;

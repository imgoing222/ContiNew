import { Input } from "./Input";
import { Label } from "./Label";

function SellerInfo() {
	return (
		<>
			<Label>임차인 주소</Label>
			<Input />
			<Label>임차인 성명</Label>
			<Input />
			<Label>임차인 생년월일</Label>
			<Input />
			<Label>임차인 전화</Label>
			<Input />
			<Label>서명</Label>
			<Signature />
		</>
	);
}

export default SellerInfo;

import { Input } from "./Input";
import { Label } from "./Label";
import { Section } from "./Section";

function ContractInfo() {
	return (
		<>
			<Section>
				<h2>임차인의 임대차계약 현황</h2>
				<Label>계약종류</Label>
				<Input />
				<Label>임차보증금</Label>
				<Input />
				<Label>관리비</Label>
				<Input />
				<Label>계약 기간</Label>
				<Input />
				<Input />
			</Section>
			<Section>
				<h2>계약내용</h2>
				<Label>총 권리금</Label>
				<Input />
				<Label>계약금</Label>
				<Input />
				<Label>중도금</Label>
				<Input />
				<Label>중도금 기간</Label>
				<Input />
				<Input />
				<Label>잔금</Label>
				<Input />
				<Label>잔금 기간</Label>
				<Input />
				<Input />
			</Section>
		</>
	);
}

export default ContractInfo;

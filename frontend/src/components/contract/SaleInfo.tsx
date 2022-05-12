import { Input } from "./Input";
import { Label } from "./Label";
import { Section } from "./Section";

function SaleInfo() {
	return (
		<>
			<h2>&#91;임대차목적물의 표시&#93;</h2>
			<Section>
				<Label>소재지</Label>
				<Input />
				<Label>면적</Label>
				<Input />
				<Label>전용면적</Label>
				<Input />
			</Section>
		</>
	);
}

export default SaleInfo;

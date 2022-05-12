import BuyerInfo from "./BuyerInfo";
import { Input } from "./Input";
import { Section } from "./Section";
import SellerInfo from "./SellerInfo";

function ContractorsInfo() {
	return (
		<Section>
			<p>본 계약을 증명하기 위하여 계약 당사자가 이의 없음을 확인하고 각각 서명 또는 날인한다.</p>
			// 날짜
			<Input />
			<Input />
			<Input />
			<SellerInfo />
			<BuyerInfo />
		</Section>
	);
}

export default ContractorsInfo;

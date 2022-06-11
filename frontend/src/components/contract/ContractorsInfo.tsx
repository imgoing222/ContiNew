import BuyerInfo from "./BuyerInfo";
import { Section } from "./Section";
import SellerInfo from "./SellerInfo";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { ContractType } from "src/types/contractType";

function ContractorsInfo() {
	const contract = useSelector((state: RootState) => state.contractInfo);
	const contractInfo: ContractType = contract["contract"];
	const step = contract["step"]["current_step"];
	const role = contract["role"]["user_role"];

	return (
		<>
			<p>본 계약을 증명하기 위하여 계약 당사자가 이의 없음을 확인하고 각각 서명 또는 날인한다.</p>
			<Section>
				<SellerInfo step={step} role={role} contractInfo={contractInfo} />
				<BuyerInfo step={step} role={role} contractInfo={contractInfo} />
			</Section>
		</>
	);
}

export default ContractorsInfo;

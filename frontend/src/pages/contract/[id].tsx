import ContractForm from "@components/contract/ContractForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import contractApi from "src/api/contract";
import ContractType from "src/types/contractType";

function Contract() {
	// 매물 id로 url 생성
	// 매물id, seller_id, buyer_id 리덕스에서 받아오기

	const router = useRouter();
	const [contractInfo, setContractInfo] = useState<ContractType>();

	useEffect(() => {
		getContractInfo();
	}, []);

	const getContractInfo = async () => {
		// const res = await contractApi.getContract(buyer, houseId, seller);
		// setContractInfo(res.data);
	};

	const handleBreakContractButton = async () => {
		if (window.confirm("계약을 파기하시겠습니까?")) {
			// await contractApi.breakContract(buyer, houseId, seller);
			router.push("/");
		}
	};

	return (
		<>
			// 계약 정보 계약 폼에 전달, 계약 단계는 따로 step이라는 props로 전달
			<ContractForm />
			<div>
				<button>임시 저장</button>
				<button>다음 단계</button>
			</div>
			<button onClick={handleBreakContractButton}>계약 파기</button>
		</>
	);
}

export default Contract;

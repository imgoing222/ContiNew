import ContractForm from "@components/contract/ContractForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import contractApi from "src/api/contract";
import { RootState } from "src/store";
import { SET_CONTRACT, SET_ROLE } from "src/store/contract";
import { ContractType } from "src/types/contractType";

function Contract() {
	// 매물 id로 url 생성
	// 매물id, seller_id, buyer_id 계약 버튼 눌렀을때 / 내 계약에서 눌렀을 때 받아올것 router.query로

	// 더미데이터
	const buyer = "test1212";
	const seller = "wjinh";
	const houseId = 43;

	const router = useRouter();
	const dispatch = useDispatch();
	const contract = useSelector((state: RootState) => state.contractInfo);
	const loginId = useSelector((state: RootState) => state.userInfo.login_id);
	console.log(contract);
	const step = contract["step"]["current_step"];

	const value = { buyer, seller, house_id: houseId };

	useEffect(() => {
		getContractInfo();
		console.log(loginId);
		if (loginId === buyer) dispatch(SET_ROLE("buyer"));
		else dispatch(SET_ROLE("seller"));
	}, []);

	const getContractInfo = async () => {
		const res = await contractApi.getContract(value);
		console.log(res);
		if (res.status) {
			dispatch(SET_CONTRACT(res.data));
		}
	};

	const handleBreakContractButton = async () => {
		if (window.confirm("계약을 파기하시겠습니까?")) {
			await contractApi.breakContract(value);
			router.push("/");
		}
	};

	const handleNextStepClick = () => {};

	return (
		<>
			<h1>{step}단계</h1>
			<ContractForm />
			<div>
				<button>임시 저장</button>
				<button onClick={handleNextStepClick}>다음 단계</button>
			</div>
			<button onClick={handleBreakContractButton}>계약 파기</button>
		</>
	);
}

export default Contract;

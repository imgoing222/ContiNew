import ContractForm from "@components/contract/ContractForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import { useDispatch, useSelector } from "react-redux";
import contractApi from "src/api/contract";
import { RootState } from "src/store";
import { SET_CONTRACT, SET_LEVEL, SET_ROLE } from "src/store/contract";
import { ContractStore, ContractType } from "src/types/contractType";

function Contract() {
	// 매물 id로 url 생성
	// 매물id, seller_id, buyer_id 계약 버튼 눌렀을때 / 내 계약에서 눌렀을 때 받아올것 router.query로

	// 더미데이터
	const buyer = "test112";
	const seller = "wjinh";
	const houseId = 43;

	const router = useRouter();
	const dispatch = useDispatch();
	const contract: ContractStore = useSelector((state: RootState) => state.contractInfo);
	const loginId = useSelector((state: RootState) => state.userInfo.login_id);
	console.log(contract);
	const step = contract.step.current_step;

	const value = { buyer, seller, house_id: houseId };

	useEffect(() => {
		// store에 buyer seller houseId 저장
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
			const res = await contractApi.breakContract(value);
			console.log(res);
			// router.push("/");
		}
	};

	const handleNextStepClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const { id } = e.target as HTMLElement;
		if (id === "next") dispatch(SET_LEVEL(true));
		else if (id === "save") dispatch(SET_LEVEL(false));
		const contractInfo = { ...contract.id, ...contract.contract, ...contract.level };
		console.log(contractInfo);
		const res = await contractApi.createContract(contractInfo);
		console.log(res);
	};

	return (
		<>
			<Stepper activeStep={step - 1}>
				<Step label="계약 조건 작성" />
				<Step label="신규 임차인 정보 작성 및 서명" />
				<Step label="임차인 서명" />
			</Stepper>
			<ContractForm />
			<div>
				<button id="save" onClick={handleNextStepClick}>
					임시 저장
				</button>
				<button id="next" onClick={handleNextStepClick}>
					다음 단계
				</button>
			</div>
			<button onClick={handleBreakContractButton}>계약 파기</button>
		</>
	);
}

export default Contract;

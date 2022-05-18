import ContractForm from "@components/contract/ContractForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import { useDispatch, useSelector } from "react-redux";
import contractApi from "src/api/contract";
import { RootState } from "src/store";
import { SET_CONTRACT, SET_ID, SET_LEVEL, SET_ROLE } from "src/store/contract";
import { ContractStore } from "src/types/contractType";

function Contract() {
	const router = useRouter();
	const dispatch = useDispatch();
	const buyerId = router.query.buyerId as string;
	const sellerId = router.query.sellerId as string;
	const articleId = Number(router.query.articleId as string);

	const contract: ContractStore = useSelector((state: RootState) => state.contractInfo);
	const loginId = useSelector((state: RootState) => state.userInfo.login_id);
	console.log(contract);

	const step = contract.step.current_step;

	const value = { buyer: buyerId, seller: sellerId, house_id: articleId };

	useEffect(() => {
		console.log("실행");
		dispatch(SET_ID(value));
		getContractInfo();
		if (loginId === buyerId) dispatch(SET_ROLE("buyer"));
		else dispatch(SET_ROLE("seller"));
	}, []);

	const getContractInfo = async () => {
		const res = await contractApi.getContract(value);
		console.log(res.data);
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

	const handleNextStepClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const { id } = e.target as HTMLElement;
		console.log(id);
		if (id === "next") dispatch(SET_LEVEL(true));
		else if (id === "save") dispatch(SET_LEVEL(false));
		console.log(contract.contract.buyer_signature);
		const contractInfo = { ...contract.id, ...contract.contract, ...contract.level };
		console.log(contractInfo);
		const res = await contractApi.createContract(contractInfo);
		console.log(res);
		if (res.status) {
			alert(`${step}단계 계약서 작성이 완료되었습니다.`);
			router.push(
				{
					pathname: `/contract/${articleId}`,
					query: { buyerId, sellerId, articleId },
				},
				`/contract/${articleId}`,
			);
		}
	};

	return (
		<>
			{step === 4 ? (
				<ContractForm />
			) : (
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
			)}
		</>
	);
}

export default Contract;

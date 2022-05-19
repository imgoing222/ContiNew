import ContractForm from "@components/contract/ContractForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import { useDispatch, useSelector } from "react-redux";
import contractApi from "src/api/contract";
import { RootState } from "src/store";
import { SET_CONTRACT, SET_ID, SET_LEVEL, SET_ROLE } from "src/store/contract";
import { ContractStore } from "src/types/contractType";
import styled from "styled-components";

interface ButtonProps {
	isColor?: boolean;
}

function Contract() {
	const router = useRouter();
	const dispatch = useDispatch();

	const buyerId = router.query.buyerId as string;
	const sellerId = router.query.sellerId as string;
	const articleId = Number(router.query.articleId as string);

	const contract: ContractStore = useSelector((state: RootState) => state.contractInfo);
	const loginId = useSelector((state: RootState) => state.userInfo.login_id);
	const step = contract.step.current_step;
	const role = contract.role.user_role;
	const value = { buyer: buyerId, seller: sellerId, house_id: articleId };

	useEffect(() => {
		dispatch(SET_ID(value));
		getContractInfo();
		if (loginId === buyerId) dispatch(SET_ROLE("buyer"));
		else dispatch(SET_ROLE("seller"));
	}, []);

	const getContractInfo = async () => {
		const res = await contractApi.getContract(value);
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
		if (id === "next") dispatch(SET_LEVEL(true));
		else if (id === "save") dispatch(SET_LEVEL(false));
		const contractInfo = { ...contract.id, ...contract.contract, ...contract.level };
		const res = await contractApi.createContract(contractInfo);
		if (res.status) {
			alert(`${step}단계 계약서 작성이 완료되었습니다.`);
			router.push("/contract");
		}
	};

	const showButtons = () => {
		if (
			(step === 1 && role === "seller") ||
			(step === 2 && role === "buyer") ||
			(step === 3 && role === "seller")
		) {
			return (
				<StyledDiv>
					<Button id="save" onClick={handleNextStepClick}>
						임시 저장
					</Button>
					<Button id="next" onClick={handleNextStepClick} isColor={true}>
						다음 단계
					</Button>
				</StyledDiv>
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
					<BreakButton onClick={handleBreakContractButton}>계약 파기</BreakButton>
					{showButtons()}
				</>
			)}
		</>
	);
}

export default Contract;

const StyledDiv = styled.div`
	display: flex;
	justify-content: center;
`;

const Button = styled.button<ButtonProps>`
	border: ${(props) => (props.isColor ? "none" : `1px solid ${props.theme.borderColor}`)};
	width: 10rem;
	height: 3rem;
	border-radius: 0.4rem;
	background-color: ${(props) => (props.isColor ? props.theme.mainColor : "#fff")};
	color: ${(props) => (props.isColor ? "#fff" : "#000")};
	margin-right: 2rem;
	cursor: pointer;
	margin-bottom: 7rem;
`;

const BreakButton = styled.button`
	width: 10rem;
	height: 3rem;
	border-radius: 0.4rem;
	cursor: pointer;
	border: none;
	background-color: inherit;
	color: #e31941;
	display: block;
	margin: 2rem 0 2rem 83vw;
	font-size: 1.2rem;
`;

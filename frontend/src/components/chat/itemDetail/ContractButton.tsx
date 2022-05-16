import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "src/store";

import { contractApi } from "src/api";

interface AgreeInfoType {
	buyer_agree: boolean;
	house_id: number;
	seller_agree: boolean;
}

function ContractButton() {
	const [contractState, setContractState] = useState("before");
	const [userType, setUserType] = useState("");
	const [agreeInfo, setAgreeInfo] = useState<AgreeInfoType>({
		buyer_agree: false,
		house_id: 0,
		seller_agree: false,
	});
	const { buyerId, sellerId, articleId } = useSelector((state: RootState) => state.articleInfo);
	const { login_id } = useSelector((state: RootState) => state.userInfo);

	useEffect(() => {
		if (agreeInfo.buyer_agree !== agreeInfo.seller_agree) {
			setContractState("request");
		} else if (agreeInfo.buyer_agree === true && agreeInfo.seller_agree === true) {
			setContractState("under");
		}
	}, [agreeInfo]);

	useEffect(() => {
		if (buyerId === login_id) {
			setUserType("buyer");
		} else {
			setUserType("seller");
		}
	}, []);

	useEffect(() => {
		getContractRequest();
	}, []);

	const getContractRequest = async () => {
		try {
			const contractRequestData = {
				buyer: buyerId,
				house_id: articleId,
				seller: sellerId,
			};
			const res = await contractApi.getContractRequest(contractRequestData);
			if (res.data) {
				setAgreeInfo(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const agreeContractRequest = async () => {
		try {
			const requestInfo = {
				house_id: articleId,
				seller_login_id: sellerId,
				buyer_login_id: buyerId,
				member_type: userType,
			};
			await contractApi.agreeContractRequest(requestInfo);
			setContractState("request");
		} catch (error) {
			console.log(error);
		}
	};

	switch (contractState) {
		case "before":
			return <button onClick={agreeContractRequest}>계약 요청</button>;
		case "request":
			return <button></button>;
		default:
			return <></>;
	}
}

const Container = styled.div``;

export default ContractButton;

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
	const [isUnderContract, setIsUnderContract] = useState(false);
	const [userType, setUserType] = useState("");
	const [agreeInfo, setAgreeInfo] = useState<AgreeInfoType>({
		buyer_agree: false,
		house_id: 0,
		seller_agree: false,
	});
	const { buyerId, sellerId, articleId } = useSelector((state: RootState) => state.articleInfo);
	const { login_id } = useSelector((state: RootState) => state.userInfo);

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
				setIsUnderContract(true);
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
			const res = await contractApi.agreeContractRequest(requestInfo);
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			{!isUnderContract ? (
				<button onClick={agreeContractRequest}>계약요청</button>
			) : (
				<button>계약 중</button>
			)}
		</Container>
	);
}

const Container = styled.div``;

export default ContractButton;

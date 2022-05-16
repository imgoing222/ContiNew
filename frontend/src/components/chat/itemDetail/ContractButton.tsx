import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
	const [agreeInfo, setAgreeInfo] = useState<AgreeInfoType>({
		buyer_agree: false,
		house_id: 0,
		seller_agree: false,
	});
	const { buyerId, sellerId, articleId } = useSelector((state: RootState) => state.articleInfo);

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
	return <></>;
}

export default ContractButton;

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "src/store";

import { contractApi } from "src/api";

interface Props {
  sendMessage?: (inputChat: string) => void;
}

interface AgreeInfoType {
	buyer_agree: boolean;
	house_id: number;
	seller_agree: boolean;
}

function ContractButton({ sendMessage }: Props) {
	const router = useRouter();
	const [contractState, setContractState] = useState("before");
	const [userType, setUserType] = useState("");
	const [isAgree, setIsAgree] = useState(false);
	const [agreeInfo, setAgreeInfo] = useState<AgreeInfoType>({
		buyer_agree: false,
		house_id: 0,
		seller_agree: false,
	});
	const { buyerId, sellerId, articleId } = useSelector((state: RootState) => state.articleInfo);
	const { login_id, username } = useSelector((state: RootState) => state.userInfo);

	const requestInfo = {
		house_id: articleId,
		seller_login_id: sellerId,
		buyer_login_id: buyerId,
		member_type: userType,
	};

	useEffect(() => {
		if (agreeInfo.buyer_agree !== agreeInfo.seller_agree) {
			setContractState("request");
			if (
				(buyerId === login_id && agreeInfo.buyer_agree) ||
				(sellerId === login_id && agreeInfo.seller_agree)
			) {
				setIsAgree(true);
			}
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

  const contractRequest = async () => {
		try {
			await contractApi.agreeContractRequest(requestInfo);
      autoMessage(`${username} 님이 계약 요청을 하였습니다.`);
			setContractState("request");
		} catch (error) {
			console.log(error);
		}
	};

	const agreeContractRequest = async () => {
		try {
			await contractApi.agreeContractRequest(requestInfo);
      autoMessage(`${username} 님이 계약 요청을 수락하였습니다.`);
			setContractState("request");
		} catch (error) {
			console.log(error);
		}
	};

	const disagreeContractRequest = async () => {
		try {
			await contractApi.disagreeContractRequest(requestInfo);
      autoMessage(`${username} 님이 계약 요청을 거절하였습니다.`);
			setContractState("before");
		} catch (error) {
			console.log(error);
		}
	};

  const autoMessage = (inputChat: string) => {
    if (sendMessage) {
      sendMessage(inputChat)
    }
  };

	switch (contractState) {
		case "before":
			return <button onClick={contractRequest}>계약 요청</button>;
		case "request":
			return (
				<>
					{isAgree ? (
						<button>계약 요청 중</button>
					) : (
						<div>
							<button onClick={agreeContractRequest}>계약 수락</button>
							<button onClick={disagreeContractRequest}>계약 거절</button>
						</div>
					)}
				</>
			);
		default:
			return <button onClick={() => router.push(`/contract/${articleId}`)}>계약 중</button>;
	}
}

const Container = styled.div``;

export default ContractButton;

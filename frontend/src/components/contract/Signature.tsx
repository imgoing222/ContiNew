import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactSignatureCanvas from "react-signature-canvas";
import { RootState } from "src/store";
import { SET_STEP2, SET_STEP3 } from "src/store/contract";
import { ContractType } from "src/types/contractType";
import styled from "styled-components";

interface Props {
	signatureDisabled: boolean;
	role: string;
	from: string;
}
function Signature({ signatureDisabled, role, from }: Props) {
	const dispatch = useDispatch();
	const signCanvas = useRef() as React.MutableRefObject<any>;
	const contract = useSelector((state: RootState) => state.contractInfo);
	const contractInfo: ContractType = contract["contract"];

	const formatIntoPng = () => {
		if (signCanvas.current) {
			const dataURL = signCanvas.current.toDataURL("image/png");
			if (role === "seller") dispatch(SET_STEP3(dataURL));
			if (role === "buyer") dispatch(SET_STEP2({ ...contractInfo, buyer_signature: dataURL }));
		}
	};

	return (
		<div>
			{signatureDisabled ? (
				<DisabledCanvas>
					<img
						src={
							from === "sellerInfo" ? contractInfo.seller_signature : contractInfo.buyer_signature
						}
					/>
				</DisabledCanvas>
			) : (
				<>
					<ReactSignatureCanvas
						ref={signCanvas}
						canvasProps={{ width: 300, height: 100, className: "sigCanvas" }}
						clearOnResize={false}
						backgroundColor="rgb(245, 245, 245)"
						onEnd={formatIntoPng}
					/>
					<button
						onClick={() => {
							signCanvas.current.clear();
						}}
					>
						clear
					</button>
				</>
			)}
		</div>
	);
}

const DisabledCanvas = styled.div`
	width: 30rem;
	height: 10rem;
	background-color: rgb(245, 245, 245);
`;
export default Signature;

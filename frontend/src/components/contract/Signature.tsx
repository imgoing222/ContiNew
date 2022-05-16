import { useRef, useState } from "react";
import ReactSignatureCanvas from "react-signature-canvas";
import styled from "styled-components";

interface Props {
	signatureDisabled: boolean;
}
function Signature({ signatureDisabled }: Props) {
	const signCanvas = useRef() as React.MutableRefObject<any>;

	return (
		<div>
			{signatureDisabled ? (
				<DisabledCanvas></DisabledCanvas>
			) : (
				<ReactSignatureCanvas
					ref={signCanvas}
					canvasProps={{ width: 300, height: 100, className: "sigCanvas" }}
					clearOnResize={false}
					backgroundColor="rgb(245, 245, 245)"
				/>
			)}
			<button
				onClick={() => {
					signCanvas.current.clear();
				}}
			>
				clear
			</button>
		</div>
	);
}

const DisabledCanvas = styled.div`
	width: 30rem;
	height: 10rem;
	background-color: rgb(245, 245, 245);
`;
export default Signature;

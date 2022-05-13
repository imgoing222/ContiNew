import { useRef } from "react";
import ReactSignatureCanvas from "react-signature-canvas";

function Signature() {
	const signCanvas = useRef() as React.MutableRefObject<any>;

	return (
		<div>
			<ReactSignatureCanvas
				ref={signCanvas}
				canvasProps={{ width: 300, height: 100, className: "sigCanvas" }}
				clearOnResize={false}
				backgroundColor="rgb(245, 245, 245)"
			/>
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

export default Signature;

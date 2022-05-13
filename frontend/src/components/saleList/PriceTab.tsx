import { useState } from "react";
import styled from "styled-components";
import Slider from "./Slider";

function PriceTab() {
	const [isOpen, setIsOpen] = useState(false);

	const tabChagneHandler = () => {
		setIsOpen(!isOpen);
	};
	return (
		<div style={{ marginLeft: "2rem" }}>
			<button onClick={tabChagneHandler}>전세, 월세</button>
			<div>
				<div>
					{/* <h1>거래 유형</h1>
					<label htmlFor="월세" style={{ cursor: "pointer" }}>
						월세
					</label>
					<input type="checkbox" id="월세" />
					<label htmlFor="전세">전세</label>
					<input type="checkbox" id="전세" style={{ cursor: "pointer" }} /> */}
				</div>
				<div>
					<h1>가격 정보</h1>
					<p>보증금/전세가</p>
					<Slider minValue={0} maxValue={1000} label={{ min: "0", max: "1억" }} />
				</div>
			</div>
		</div>
	);
}

export default PriceTab;

const SliderBox = styled.div`
	display: flex;
`;

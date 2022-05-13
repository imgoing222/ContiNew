import React from "react";
import Container from "./Container";
import Slider from "./Slider";

function Period() {
	return (
		<Container title="임대 기간">
			<Slider title="기간" step={1} maxMin={{ min: 0, max: 24 }} subTitle="임대 기간" unit="기간" />
		</Container>
	);
}

export default Period;

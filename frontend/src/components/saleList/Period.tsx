import React from "react";
import { useDispatch } from "react-redux";
import { setPeriod } from "src/store/searchFilter";
import Container from "./Container";

function Period() {
	setPeriod;
	return (
		<Container title="임대 기간">
			<div>a</div>
		</Container>
	);
}

export default Period;

import Map from "@components/SaleList/Map";
import SaleListNav from "@components/SaleList/SaleListNav";
import React, { useRef } from "react";

function SaleList() {
	const kakaoMap = useRef<HTMLElement | null>(null);
	return (
		<>
			<SaleListNav kakaoMap={kakaoMap} />
			<Map kakaoMap={kakaoMap} />
		</>
	);
}

export default SaleList;

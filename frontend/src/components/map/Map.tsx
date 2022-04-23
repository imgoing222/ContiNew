import Script from "next/script";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

function Map() {
	const [myLocation, setMyLocation] = useState<{ latitude: number; longitude: number } | string>(
		"",
	);
	const [zoom, setZoom] = useState(11);
	return (
		<>
			<Script
				type="text/javascript"
				src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=hbx0fr2s1r"
			></Script>
			<div id="map" style={{ width: "70%", height: "100vh" }}></div>
		</>
	);
}

export default Map;

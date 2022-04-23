import React from "react";
import Script from "next/script";

function Map() {
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

import React from "react";
import Script from "next/script";

function inputsearch() {
	return (
		<>
			<Script
				type="text/javascript"
				src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=hbx0fr2s1r&submodules=geocoder"
			></Script>
			<div>
				<label htmlFor="addressSearch">검색</label>
				<form onSubmit={handleSubmit}>
					<input type="text" id="addressSearch" value={search} onChange={handleChange} />
				</form>
			</div>
		</>
	);
}

export default inputsearch;

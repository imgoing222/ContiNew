import React, { useState } from "react";
import Script from "next/script";

function Search() {
	const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;

	const [search, setSearch] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		naver.maps.Service.geocode({ query: search }, function (status, response) {
			if (status === naver.maps.Service.Status.ERROR) {
				return alert("Something wrong!");
			}
			if (response.v2.meta.count > 0) {
				console.log(response.v2.addresses[0].x);
				console.log(response.v2.addresses[0].y);
			}
		});
	};

	return (
		<>
			<Script
				type="text/javascript"
				src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${CLIENT_ID}&submodules=geocoder`}
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

export default Search;

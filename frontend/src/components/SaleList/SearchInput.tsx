import { useState } from "react";
import styled from "styled-components";
import { RefProps } from "./SaleListNav";

function SearchInput({ kakaoMap }: RefProps) {
	const [keyword, setKeyword] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const geocoder = new window.kakao.maps.services.Geocoder();
		const places = new window.kakao.maps.services.Places();
		const searchAddress = (result, status) => {
			if (result.length === 0) return;
			if (status === window.kakao.maps.services.Status.OK) {
				const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

				kakaoMap.current.setCenter(coords);
			}
		};

		geocoder.addressSearch(keyword, searchAddress);
		places.keywordSearch(keyword, searchAddress);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	};

	return (
		<SearchForm onSubmit={handleSubmit}>
			<Input value={keyword} onChange={handleChange} />
			<Button>검색</Button>
		</SearchForm>
	);
}

export default SearchInput;

const SearchForm = styled.form`
	width: 40rem;
	display: flex;
`;

const Input = styled.input`
	width: 30rem;
	height: 4rem;
	font-size: 1.5rem;
	outline: none;
	border: none;
`;

const Button = styled.button`
	width: 5rem;
	height: 4rem;
	color: #fff;
	background-color: ${(props) => props.theme.mainColor};
	border: none;
	font-size: 1.5rem;
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
`;

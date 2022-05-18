import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { MapRefType } from "src/pages/saleList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { GeoCodeType, Result } from "src/types/addressresult";
import { useRouter } from "next/router";

function SearchInput({ kakaoMap }: MapRefType) {
	const router = useRouter();
	const buttonRef = useRef<HTMLButtonElement>(null);
	const inputValue = String(router.query.inputValue);

	useEffect(() => {
		if (inputValue !== "undefined") {
			setKeyword(inputValue);
			setTimeout(() => {buttonRef.current && buttonRef.current.click()}, 100);
		}
	}, []);

	const [keyword, setKeyword] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const geocoder = new window.kakao.maps.services.Geocoder();
		const places = new window.kakao.maps.services.Places();

		const searchAddress = (
			result: Result[] | GeoCodeType[],
			status: kakao.maps.services.Status,
		) => {
			console.log(result);
			if (result.length === 0) return;
			if (status === window.kakao.maps.services.Status.OK) {
				const coords = new window.kakao.maps.LatLng(+result[0].y, +result[0].x);

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
		<Container>
			<MagnifyingGlass icon={faMagnifyingGlass} />
			<SearchForm onSubmit={handleSubmit}>
				<Input value={keyword} onChange={handleChange} placeholder="ex) 서초동, 서울대학교" />
				<Button ref={buttonRef}>검색</Button>

			</SearchForm>
		</Container>
	);
}

export default SearchInput;

const Container = styled.div`
	display: flex;
	align-items: center;
`;

const SearchForm = styled.form`
	display: flex;
	@media ${(props) => props.theme.mobileXS} {
		align-items: center;
	}
`;

const Input = styled.input`
	width: 30rem;
	height: 4rem;
	font-size: 1.5rem;
	outline: none;
	border: none;
	@media ${(props) => props.theme.mobile} {
		width: 17rem;
	}
	@media ${(props) => props.theme.mobileXS} {
		width: 6rem;
	}
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
	@media ${(props) => props.theme.mobileXS} {
		width: 3rem;
		height: 3rem;
		font-size: 1rem;
	}
`;

const MagnifyingGlass = styled(FontAwesomeIcon)`
	width: 2rem;
	height: 2rem;
	margin-right: 1rem;
	@media ${(props) => props.theme.mobileXS} {
		width: 1rem;
		height: 1rem;
	}
`;

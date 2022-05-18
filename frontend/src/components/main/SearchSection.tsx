import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

export interface MapRefType {
	kakaoMap: React.MutableRefObject<kakao.maps.Map>;
}

function SearchSection() {
	const router = useRouter();
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const $script = document.createElement("script");
		$script.async = true;
		$script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&autoload=false&libraries=services,clusterer,drawing`;
		document.head.appendChild($script);
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const search = () => {
		if (inputValue) {
			router.push({
				pathname: "/saleList",
				query: {
					inputValue: inputValue,
				},
			});
		}
	};

	const onKeyDownEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key == "Enter" && !event.shiftKey) {
			event.preventDefault();
			search();
		}
	};

	return (
		<Section>
			<SearchBox>
				<Input
					type="text"
					onChange={handleChange}
					placeholder="지역명을 입력해주세요."
					onKeyDown={onKeyDownEnter}
				/>
				<Button onClick={search}>검색</Button>
			</SearchBox>
		</Section>
	);
}

const Section = styled.section`
	height: 60rem;
	background: url("/background.webp");
	background-size: 100% 100%;
	background-repeat: no-repeat;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SearchBox = styled.div`
	margin: auto 0 10rem;
	width: 60rem;
	height: 6rem;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	background-color: #ffffff;
	align-items: center;

	@media ${(props) => props.theme.mobile} {
		width: 27rem;
	}

	@media ${(props) => props.theme.mobileXS} {
		width: 13rem;
		height: 4rem;
	}
`;

const Input = styled.input`
	width: 48rem;
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
	width: 7rem;
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

export default SearchSection;

import React from "react";
import styled from "styled-components";

function SearchInput() {
	return (
		<SearchForm>
			<Input />
			<Button>검색</Button>
		</SearchForm>
	);
}

export default SearchInput;

const SearchForm = styled.form`
	width: 30rem;
	display: flex;
  a
`;

const Input = styled.input`
	width: 15rem;
	height: 4rem;
	font-size: 1.5rem;
	outline: none;
`;

const Button = styled.button`
	width: 4rem;
	height: 4rem;
	color: #fff;
	background-color: ${(props) => props.theme.mainColor};
	border: none;
	font-size: 1.5rem;
	font-weight: bold;
`;

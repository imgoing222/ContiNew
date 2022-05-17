import styled from "styled-components";

export const Button = styled.button`
	border: none;
	color: #fff;
	background-color: ${(props) => props.theme.mainColor};
	font-size: 1.5rem;
	padding: 0.5rem;
	text-align: center;
	&:hover {
		cursor: pointer;
	}
`;

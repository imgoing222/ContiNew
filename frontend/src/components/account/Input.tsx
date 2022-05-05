import styled from "styled-components";

export const Input = styled.input`
	border: 0.2px solid #dedede;
	outline: none;
	background-color: ${({ disabled }) => (disabled ? "#eaeaea" : "inherit")};
	margin-top: 1rem;
	padding: 1rem;
`;

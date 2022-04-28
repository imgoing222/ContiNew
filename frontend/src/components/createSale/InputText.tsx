import styled from "styled-components";

interface Props {
	width?: number;
	margin?: number;
}

const InputText = styled.input<Props>`
	width: ${({ width }) => (width ? width + "rem" : "20rem")};
	height: 2rem;
	font-size: 1.2rem;
	padding: 2rem;
	outline: none;
	margin-left: ${({ margin }) => (margin ? margin + "rem" : "0")};
`;

export default InputText;

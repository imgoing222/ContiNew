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
	@media ${(props) => props.theme.mobile} {
		width: 15rem;
	}
	@media ${(props) => props.theme.mobileXS} {
		width: 10rem;
		margin-left: ${({ margin }) => (margin ? "2rem" : "0")};
	}
`;

export default InputText;

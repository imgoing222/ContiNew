import styled from "styled-components";
interface InputProps {
	width?: number;
	margin?: number;
}
export const Input = styled.input<InputProps>`
	width: ${({ width }) => (width ? `${width}rem` : "calc(100% - 12rem)")};
	margin-right: ${({ margin }) => margin && `${margin}rem`};
	@media ${(props) => props.theme.tabletS} {
		width: ${({ width }) => (width ? `${width - 10}rem` : "calc(100% - 12rem)")};
	}
	@media ${(props) => props.theme.mobile} {
		width: ${({ width }) => (width ? `${width - 13}rem` : "calc(100% - 12rem)")};
	}
	@media ${(props) => props.theme.mobile} {
		width: calc(100% - 10rem);
	}
`;

export const RadioInput = styled.input`
	border-radius: 0;
	margin-right: 4rem;
`;

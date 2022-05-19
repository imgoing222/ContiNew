import styled from "styled-components";

interface Props {
	width?: number;
	marginRight?: number;
}
export const Input = styled.input<Props>`
	border: 0.2px solid #dedede;
	outline: none;
	background-color: ${({ disabled }) => (disabled ? "#f8f8f8" : "inherit")};
	margin-top: 1rem;
	padding: 1rem;
	display: block;
	width: ${({ width }) => (width ? `${width}%` : "100%")};
	margin-right: ${({ marginRight }) => (marginRight ? `${marginRight}rem` : 0)}; ;
`;

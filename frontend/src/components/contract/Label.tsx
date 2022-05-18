import styled from "styled-components";

interface Props {
	width?: number;
	bold?: boolean;
}

export const Label = styled.label<Props>`
	display: block;
	font-size: 1.5rem;
	width: ${({ width }) => (width ? `${width}rem` : "12rem")};
	font-weight: ${({ bold }) => !bold && "bold"};
	@media ${(props) => props.theme.mobile} {
		width: ${({ width }) => (width ? "3rem" : "7rem")};
		font-size: 1.3rem;
	}
`;

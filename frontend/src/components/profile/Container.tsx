import styled from "styled-components";

interface Props {
	border?: boolean;
	padding?: number;
}

export const Container = styled.div<Props>`
	display: flex;
	flex-direction: column;
	border: ${({ border }) => (border ? "0.1px solid #dedede;" : "none")};
	padding: ${({ padding }) => (padding ? `${padding}rem` : "0")};
`;

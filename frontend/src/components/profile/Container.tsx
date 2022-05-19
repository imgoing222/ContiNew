import styled from "styled-components";

interface Props {
	border?: boolean;
}

export const Container = styled.div<Props>`
	display: flex;
	flex-direction: column;
	border: ${({ border }) => (border ? "0.1px solid #dedede;" : "none")};
	padding: 4rem;
`;

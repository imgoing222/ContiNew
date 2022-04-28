import styled from "styled-components";

interface CheckedProps {
	isCheck: string | undefined;
}
export const Ul = styled.ul`
	display: flex;
`;

export const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

export const Tr = styled.tr`
	width: 100%;
	height: 7rem;
	border-top: 1px solid ${(props) => props.theme.borderColor};
`;

export const Th = styled.th`
	font-size: 1.5rem;
	width: 15rem;
	height: 100%;
	border-top: 1px solid ${(props) => props.theme.borderColor};

	margin-right: 2rem;
`;

export const Td = styled.td`
	display: block;
	padding: 1rem 0;
	margin-left: 1rem;
`;

export const Label = styled.label`
	position: relative;
	display: block;
	margin-right: 1rem;
`;

export const InputRadio = styled.input`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	opacity: 0;
	cursor: pointer;
`;

export const Text = styled.p`
	display: inline;
	font-size: 2rem;
`;

export const Pbox = styled.p<CheckedProps>`
	font-size: 1.2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 8rem;
	min-height: 4.5rem;
	border: 1px solid ${(props) => (props.isCheck ? "none" : props.theme.borderColor)};
	color: ${(props) => (props.isCheck ? "#fff" : "#000")};
	background-color: ${(props) => (props.isCheck ? props.theme.mainColor : "#fff")};
	border-radius: 0.4rem;
`;

import styled from "styled-components";

interface CheckedProps {
	isCheck: string | undefined;
}

interface TextProps {
	size?: number;
}

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
	font-size: 1.4rem;
	margin-left: 0.5rem;
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

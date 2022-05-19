import React, { useRef, useState } from "react";
import styled from "styled-components";
import useOutside from "@hooks/useOutside";

interface Props {
	title: string;
	children: React.ReactNode;
	isPrice?: string;
	width?: number;
}

interface DivProps {
	isPrice?: string;
	width?: number;
}

function Container({ title, children, isPrice, width }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	const Ref = useRef<HTMLDivElement>(null);
	useOutside({ Ref, setFunction: setIsOpen });
	const tabChagneHandler = () => {
		setIsOpen(!isOpen);
	};
	return (
		<Box ref={Ref}>
			<Button onClick={tabChagneHandler}>{title}</Button>
			{isOpen && (
				<SubBox width={width} isPrice={isPrice}>
					{children}
				</SubBox>
			)}
		</Box>
	);
}

export default Container;

const Box = styled.div`
	margin: 1rem;
	position: relative;
	@media ${(props) => props.theme.mobileS} {
		margin: 0;
		display: flex;
		align-items: center;
	}
`;

const Button = styled.button`
	width: 12rem;
	height: 4rem;
	font-size: 1.4rem;
	font-weight: bold;
	background: none;
	border: ${(props) => `1px solid ${props.theme.borderColor}`};
	cursor: pointer;
	@media ${(props) => props.theme.mobile} {
		width: 6rem;
		font-size: 1rem;
	}
	@media ${(props) => props.theme.mobileXS} {
		width: 7rem;
		height: 3rem;
	}
`;

const SubBox = styled.div<DivProps>`
	display: flex;
	flex-direction: column;
	position: absolute;
	top: 4.5rem;
	left: 0;
	z-index: 4;
	background-color: #fff;
	padding: 2rem;
	width: ${(props) => (props.width ? `${props.width}rem` : "45rem")};
	border: 1px solid rgba(0, 0, 0, 0.2);
	@media ${(props) => props.theme.tabletS} {
		width: ${(props) => (props.width ? `${props.width}rem` : "36rem")};
		left: ${({ isPrice }) => (isPrice === "option" ? "-28rem" : "-25rem")};
		left: ${({ isPrice }) => isPrice === "room" && "0"};
	}
	@media ${(props) => props.theme.mobile} {
		width: ${(props) => (props.width ? `${props.width}rem` : "35rem")};
	}
	@media ${(props) => props.theme.mobileS} {
		width: ${(props) => (props.width ? `${props.width}rem` : "30rem")};
		left: -20rem;
		left: ${({ isPrice }) => isPrice === "room" && "0"};
	}
	@media ${(props) => props.theme.mobileXS} {
		width: ${(props) => (props.width ? `${props.width}rem` : "28rem")};
		top: 3.5rem;
		left: ${({ isPrice }) => (isPrice === "price" ? "0" : "-18rem")};
		left: ${({ isPrice }) => isPrice === "room" && "0"};
	}
`;

import React, { useRef, useState } from "react";
import styled from "styled-components";
import useOutside from "@hooks/useOutside";

interface Props {
	title: string;
	children: React.ReactNode;
	isPrice?: string;
}

interface DivProps {
	isPrice?: string;
}

function Container({ title, children, isPrice }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	const Ref = useRef<HTMLDivElement>(null);
	useOutside({ Ref, setFunction: setIsOpen });
	const tabChagneHandler = () => {
		setIsOpen(!isOpen);
	};
	return (
		<Box ref={Ref}>
			<Button onClick={tabChagneHandler}>{title}</Button>
			{isOpen && <SubBox isPrice={isPrice}>{children}</SubBox>}
		</Box>
	);
}

export default Container;

const Box = styled.div`
	margin: 1rem;
	position: relative;
	@media ${(props) => props.theme.mobileXS} {
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
		width: 7rem;
		font-size: 1.2rem;
	}
	@media ${(props) => props.theme.mobileXS} {
		width: 10rem;
		height: 3rem;
		font-size: 1.2rem;
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
	width: 45rem;
	border: 1px solid rgba(0, 0, 0, 0.2);
	@media ${(props) => props.theme.tabletS} {
		width: 40rem;
		left: ${({ isPrice }) => (isPrice === "option" ? "-28rem" : "-25rem")};
	}
	@media ${(props) => props.theme.mobile} {
		width: 35rem;
	}
	@media ${(props) => props.theme.mobileS} {
		width: 30rem;
		left: -20rem;
	}
	@media ${(props) => props.theme.mobileXS} {
		width: 28rem;
		top: 3.5rem;
		left: ${({ isPrice }) => (isPrice === "price" ? "0" : "-18rem")};
	}
`;

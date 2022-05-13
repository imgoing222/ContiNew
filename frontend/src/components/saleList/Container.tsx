import React, { ReactElement, useRef, useState } from "react";
import styled from "styled-components";
import useOutside from "@hooks/useOutside";

interface Props {
	title: string;
	children: React.ReactNode;
}

function Container({ title, children }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	const Ref = useRef<HTMLDivElement>(null);
	useOutside({ Ref, setFunction: setIsOpen });
	const tabChagneHandler = () => {
		setIsOpen(!isOpen);
	};
	return (
		<Box ref={Ref}>
			<Button onClick={tabChagneHandler}>{title}</Button>
			{isOpen && <SubBox>{children}</SubBox>}
		</Box>
	);
}

export default Container;

const Box = styled.div`
	margin: 1rem;
	position: relative;
`;

const Button = styled.button`
	width: 12rem;
	height: 4rem;
	font-size: 1.4rem;
	font-weight: bold;
	background: none;
	border: ${(props) => `1px solid ${props.theme.borderColor}`};
	cursor: pointer;
`;

const SubBox = styled.div`
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
`;

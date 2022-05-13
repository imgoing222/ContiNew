import React, { ReactElement, useState } from "react";
import styled from "styled-components";

interface Props {
	title: string;
	children: React.ReactChild;
}

function Container({ title, children }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	const tabChagneHandler = () => {
		setIsOpen(!isOpen);
	};
	return (
		<Box>
			<Button onClick={tabChagneHandler}>{title}</Button>
			{isOpen && children}
		</Box>
	);
}

export default Container;

const Box = styled.div`
	margin-left: 2rem;
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

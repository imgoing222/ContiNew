import styled from "styled-components";
import React from "react";

interface PropsType {
	title: string;
	children: React.ReactNode;
}

export const Container = ({ title, children }: PropsType) => (
	<Layout>
		<Title>{title}</Title>
		<Table>
			<tbody>{children}</tbody>
		</Table>
	</Layout>
);

export const SmallContainer = ({ title, children }: PropsType) => (
	<Layout>
		<Title>{title}</Title>
		{children}
	</Layout>
);

const Layout = styled.section`
	border: 1px solid ${(props) => props.theme.borderColor};
	width: 100%;
	margin-bottom: 4rem;
`;

const Title = styled.h1`
	font-size: 2rem;
	font-size: bold;
	text-align: center;
	padding: 1rem;
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

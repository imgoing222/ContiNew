import styled from "styled-components";
import React from "react";
import TableProps from "src/types/TableProps";

export const Container = ({ title, children }: TableProps) => (
	<Layout>
		<Title>{title}</Title>
		<Table>
			<tbody>{children}</tbody>
		</Table>
	</Layout>
);

export const SmallContainer = ({ title, children }: TableProps) => (
	<Layout>
		<Title>{title}</Title>
		{children}
	</Layout>
);

const Layout = styled.section`
	border: 1px solid ${(props) => props.theme.borderColor};
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

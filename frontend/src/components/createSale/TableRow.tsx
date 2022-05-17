import TableProps from "src/types/TableProps";
import styled from "styled-components";
import DivBox from "./DivBox";

interface Props {
	title?: string;
}
export function TableRow({ title, children }: TableProps) {
	return (
		<Tr>
			<Th>{title}</Th>
			<Td>
				<Ul title={title}>{children}</Ul>
			</Td>
		</Tr>
	);
}

export function TableRowAndHead({ title, children }: TableProps) {
	return (
		<Tr>
			<Th>{title}</Th>
			{children}
		</Tr>
	);
}

export function TableRowAndDivBox({ title, children }: TableProps) {
	return (
		<TableRow title={title}>
			<li>
				<DivBox>{children}</DivBox>
			</li>
		</TableRow>
	);
}

export const Ul = styled.ul<Props>`
	display: flex;
	@media ${(props) => props.theme.tabletS} {
		display: ${(props) => props.title === "옵션항목" && "grid"};
		grid-template-columns: repeat(3, 1fr);
	}
	@media ${(props) => props.theme.mobile} {
		grid-template-columns: repeat(2, 1fr);
	}
	@media ${(props) => props.theme.mobileXS} {
		grid-template-columns: repeat(1, 1fr);
	}
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
	@media ${(props) => props.theme.mobile} {
		width: 10rem;
	}
`;

export const Td = styled.td`
	display: block;
	padding: 2rem 0;
	margin-left: 1rem;
`;

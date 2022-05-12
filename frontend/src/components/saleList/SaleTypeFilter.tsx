import { SearchCondition } from "src/pages/saleList";
import styled from "styled-components";

interface SaleTypeFilter {
	changeSaleType: (e: React.ChangeEvent<HTMLInputElement>) => void;
	id: string;
	searchCondition: SearchCondition;
}

interface LabelProps {
	isChecked: boolean;
}

function SaleTypeFilter({ changeSaleType, id, searchCondition }: SaleTypeFilter) {
	const isChecked = (id: string) => {
		if (id === "전체" && searchCondition.saleType === " ") return true;
		if (searchCondition.saleType === id) return true;
		return false;
	};

	return (
		<Label htmlFor={id} isChecked={isChecked(id)}>
			{id}
			<Input
				type="radio"
				name="saleType"
				onChange={changeSaleType}
				id={id}
				value={id === "전체" ? " " : id}
			/>
		</Label>
	);
}

export default SaleTypeFilter;

const Input = styled.input`
	display: none;
`;

const Label = styled.label<LabelProps>`
	margin-right: 1rem;
	cursor: pointer;
	font-size: 1.6rem;
	font-weight: ${({ isChecked }) => (isChecked ? "bold" : "200")};
	color: ${({ isChecked }) => (isChecked ? "black" : "gray")};
`;

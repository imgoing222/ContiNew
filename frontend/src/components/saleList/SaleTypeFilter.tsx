import styled from "styled-components";

interface SaleTypeFilter {
	changeSaleType: (e: React.ChangeEvent<HTMLInputElement>) => void;
	id: string;
}

function SaleTypeFilter({ changeSaleType, id }: SaleTypeFilter) {
	return (
		<Label htmlFor={id}>
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

const Label = styled.label`
	margin-right: 1rem;
	cursor: pointer;
`;

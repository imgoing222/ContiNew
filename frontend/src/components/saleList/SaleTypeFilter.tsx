import { useDispatch } from "react-redux";
import { SearchCondition } from "src/pages/saleList";
import { setSaleType } from "src/store/searchFilter";
import styled from "styled-components";

interface SaleTypeFilter {
	id: string;
	searchCondition: SearchCondition;
}

interface LabelProps {
	isChecked: boolean;
}

function SaleTypeFilter({ id, searchCondition }: SaleTypeFilter) {
	const dispatch = useDispatch();
	const isChecked = (id: string) => {
		if (id === "전체" && searchCondition.saleType === "") return true;
		if (searchCondition.saleType === id) return true;
		return false;
	};

	return (
		<Label htmlFor={id} isChecked={isChecked(id)}>
			{id}
			<Input
				type="radio"
				name="saleType"
				onChange={() => dispatch(setSaleType({ saleType: id === "전체" ? "" : id }))}
				id={id}
				value={id === "전체" ? "" : id}
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
	@media ${(props) => props.theme.mobile} {
		font-size: 1.4rem;
	}
	@media ${(props) => props.theme.mobileXS} {
		font-size: 0.9rem;
		/* margin-right: 0.1rem; */
	}
`;

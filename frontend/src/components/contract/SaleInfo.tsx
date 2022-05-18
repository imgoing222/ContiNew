import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { SET_STEP1 } from "src/store/contract";
import { ContractType } from "src/types/contractType";
import styled from "styled-components";
import { Input } from "./Input";
import { Label } from "./Label";
import { Section } from "./Section";

interface Props {
	disabled: boolean;
	contractInfo: ContractType;
}
interface ContainerProps {
	isJustify?: boolean;
}

function SaleInfo({ disabled, contractInfo }: Props) {
	const dispatch = useDispatch();

	const handleSaleInfoChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target as HTMLInputElement;
		dispatch(SET_STEP1({ ...contractInfo, [name]: value }));
	}, 500);

	return (
		<>
			<h2>&#91;임대차목적물의 표시&#93;</h2>
			<Section>
				<Container>
					<Label>소재지</Label>
					<Input
						name="location"
						disabled={disabled}
						onChange={handleSaleInfoChange}
						defaultValue={contractInfo.location}
					/>
				</Container>

				<Container isJustify={true}>
					<Box>
						<Label>면적</Label>
						<Input
							name="area"
							disabled={disabled}
							onChange={handleSaleInfoChange}
							defaultValue={contractInfo.area}
							width={25}
						/>
					</Box>
					<Box>
						<Label>전용면적</Label>
						<Input
							name="net_leasable_area"
							disabled={disabled}
							onChange={handleSaleInfoChange}
							defaultValue={contractInfo.net_leasable_area}
							width={25}
						/>
					</Box>
				</Container>
			</Section>
		</>
	);
}

export default SaleInfo;

export const Container = styled.div<ContainerProps>`
	display: flex;
	margin-bottom: 2rem;
	justify-content: ${({ isJustify }) => isJustify && "space-between"};
	@media ${(props) => props.theme.mobileS} {
		flex-direction: ${({ isJustify }) => isJustify && "column"};
	}
`;

export const Box = styled.div`
	display: flex;
	align-items: center;
	@media ${(props) => props.theme.mobileS} {
		margin-bottom: 2rem;
	}
`;

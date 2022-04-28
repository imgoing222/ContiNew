import { EventProps } from "src/pages/createSale";
import { Layout, Title } from "./index";
import { InputText, Label, Table, Td, Th, Tr, Ul } from "./Table";

function PriceInfo({ changeEvent, houseInfo }: EventProps) {
	return (
		<Layout>
			<Title>가격 정보</Title>
			<Table>
				<tbody>
					<Tr>
						<Th>가격 정보</Th>
						<Td>
							<Ul>
								<li>
									<Label htmlFor="deposit">
										<InputText
											type="text"
											name="deposit"
											onChange={changeEvent}
											value={houseInfo.deposit}
										/>
									</Label>
								</li>
							</Ul>
						</Td>
					</Tr>
				</tbody>
			</Table>
		</Layout>
	);
}

export default PriceInfo;

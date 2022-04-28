import { EventProps } from "src/pages/createSale";
import { DivBox, Layout, Title } from "./index";
import { InputText, Label, Table, Td, Text, Th, Tr, Ul } from "./Table";

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
									<DivBox>
										<InputText
											type="text"
											name="deposit"
											onChange={changeEvent}
											value={houseInfo.deposit}
											placeholder="보증금"
										/>
										<Text> / </Text>
										<InputText
											type="text"
											name="monthlyRent"
											onChange={changeEvent}
											value={houseInfo.monthlyRent}
											placeholder="월세"
										/>
										<Text> 만원 </Text>
									</DivBox>
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

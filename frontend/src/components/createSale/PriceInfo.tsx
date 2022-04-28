import { EventProps } from "src/pages/createSale";
import { InputText, DivBox, Layout, Title } from "./index";
import { Table, Td, Text, Th, Tr, Ul } from "./Table";

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
					<Tr>
						<Th>관리비</Th>
						<Td>
							<Ul>
								<li>
									<DivBox>
										<InputText
											type="text"
											name="maintenanceFee"
											onChange={changeEvent}
											value={houseInfo.maintenanceFee}
											placeholder="관리비"
										/>
										<Text> 만원 </Text>
										<InputText
											type="text"
											name="maintenanceDetail"
											onChange={changeEvent}
											value={houseInfo.maintenanceDetail}
											placeholder="관리비 포함 항목"
											width={55}
											margin={5}
										/>
									</DivBox>
								</li>
							</Ul>
						</Td>
					</Tr>
					<Tr>
						<Th>임대 기간</Th>
						<Td>
							<Ul>
								<li>
									<DivBox>
										<InputText
											type="text"
											name="period"
											onChange={changeEvent}
											value={houseInfo.period}
											placeholder="임대기간"
										/>
										<Text> 개월 </Text>
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

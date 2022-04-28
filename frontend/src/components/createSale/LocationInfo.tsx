import { EventProps } from "src/pages/createSale";
import { Button, DivBox, InputText, Layout, Title } from "./index";
import { Table, Td, Th, Tr, Ul } from "./Table";

function LocationInfo({ houseInfo, changeEvent }: EventProps) {
	return (
		<Layout>
			<Title>위치 정보</Title>
			<Table>
				<tbody>
					<Tr>
						<Th>주소</Th>
						<Td>
							<Ul>
								<li>
									<DivBox>
										<InputText width={40} />
										<Button>주소 검색</Button>
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

export default LocationInfo;

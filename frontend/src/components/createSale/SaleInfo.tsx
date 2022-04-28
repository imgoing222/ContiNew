import { EventProps } from "src/pages/createSale";
import { Layout, Title } from "./index";
import { InputRadio, Label, Pbox, Table, Td, Th, Tr, Ul } from "./Table";

function SaleInfo({ changeEvent, houseInfo }: EventProps) {
	return (
		<Layout>
			<Title>매물 정보</Title>
			<Table>
				<tbody>
					<Tr>
						<Th>매물 정보</Th>
						<Td>
							<Ul>
								<li>
									<Label htmlFor="saleType">
										<InputRadio
											type="radio"
											name="saleType"
											value="이어살기"
											checked={houseInfo.saleType === "이어살기"}
											onChange={changeEvent}
										/>
										<Pbox isCheck={houseInfo.saleType === "이어살기" ? "checked" : undefined}>
											이어살기
										</Pbox>
									</Label>
								</li>
								<li>
									<Label htmlFor="saleType">
										<InputRadio
											type="radio"
											name="saleType"
											value="쉐어하우스"
											checked={houseInfo.saleType === "쉐어하우스"}
											onChange={changeEvent}
										/>
										<Pbox isCheck={houseInfo.saleType === "쉐어하우스" ? "checked" : undefined}>
											쉐어 하우스
										</Pbox>
									</Label>
								</li>
							</Ul>
						</Td>
					</Tr>
					<Tr>
						<Th>종류 선택</Th>
						<Td>
							<Ul>
								<li>
									<Label htmlFor="houseType">
										<InputRadio
											type="radio"
											name="houseType"
											value="원룸"
											checked={houseInfo.houseType === "원룸"}
											onChange={changeEvent}
										/>
										<Pbox isCheck={houseInfo.houseType === "원룸" ? "chcked" : undefined}>
											원룸
										</Pbox>
									</Label>
								</li>
								<li>
									<Label htmlFor="houseType">
										<InputRadio
											type="radio"
											name="houseType"
											value="투룸"
											checked={houseInfo.houseType === "투룸"}
											onChange={changeEvent}
										/>
										<Pbox isCheck={houseInfo.houseType === "투룸" ? "chcked" : undefined}>
											투룸
										</Pbox>
									</Label>
								</li>
								<li>
									<Label htmlFor="houseType">
										<InputRadio
											type="radio"
											name="houseType"
											value="쓰리룸"
											checked={houseInfo.houseType === "쓰리룸"}
											onChange={changeEvent}
										/>
										<Pbox isCheck={houseInfo.houseType === "쓰리룸" ? "chcked" : undefined}>
											쓰리룸
										</Pbox>
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

export default SaleInfo;

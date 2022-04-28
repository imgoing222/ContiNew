import { EventProps } from "src/pages/createSale";
import { Layout, Title } from "./index";
import { Input, Label, Pbox, Table, Td, Th, Tr, Ul } from "./Table";

function SaleInfo({ changeEvent, checked }: EventProps) {
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
										<Input
											type="radio"
											name="saleType"
											value="이어살기"
											checked={checked.saleType === "이어살기"}
											onChange={changeEvent}
										/>
										<Pbox isCheck={checked.saleType === "이어살기" ? "checked" : undefined}>
											이어살기
										</Pbox>
									</Label>
								</li>
								<li>
									<Label htmlFor="saleType">
										<Input
											type="radio"
											name="saleType"
											value="쉐어하우스"
											checked={checked.saleType === "쉐어하우스"}
											onChange={changeEvent}
										/>
										<Pbox isCheck={checked.saleType === "쉐어하우스" ? "checked" : undefined}>
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
										<Input
											type="radio"
											name="houseType"
											value="원룸"
											checked={checked.houseType === "원룸"}
											onChange={changeEvent}
										/>
										<Pbox isCheck={checked.houseType === "원룸" ? "chcked" : undefined}>원룸</Pbox>
									</Label>
								</li>
								<li>
									<Label htmlFor="houseType">
										<Input
											type="radio"
											name="houseType"
											value="투룸"
											checked={checked.houseType === "투룸"}
											onChange={changeEvent}
										/>
										<Pbox isCheck={checked.houseType === "투룸" ? "chcked" : undefined}>투룸</Pbox>
									</Label>
								</li>
								<li>
									<Label htmlFor="houseType">
										<Input
											type="radio"
											name="houseType"
											value="쓰리룸"
											checked={checked.houseType === "쓰리룸"}
											onChange={changeEvent}
										/>
										<Pbox isCheck={checked.houseType === "쓰리룸" ? "chcked" : undefined}>
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

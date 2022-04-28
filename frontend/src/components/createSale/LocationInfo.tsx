import { useEffect } from "react";
import { EventProps } from "src/pages/createSale";
import { Button, DivBox, InputText, Layout, Title } from "./index";
import { Table, Td, Text, Th, Tr, Ul } from "./Table";
import axios from "axios";
function LocationInfo({ houseInfo, changeEvent }: EventProps) {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
		document.body.append(script);
	}, []);

	const searchCoordinate = async () => {
		const result = await axios.get(
			"https://dapi.kakao.com/v2/local/search/address.json?query=산격1동",
			{
				headers: {
					Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API}`,
				},
			},
		);
		const longitude = result.data.documents[0].x;
		const latitude = result.data.documents[0].y;
	};
	const loadLayout = () => {
		window.daum.postcode.load(() => {
			const postcode = new window.daum.Postcode({
				oncomplete: function (data) {
					// searchCoordinate();
					console.log(data.jibunAddress);
				},
			});
			postcode.open();
		});
	};

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
										<InputText
											width={40}
											value={houseInfo.jibunAddress}
											name="jibunAddress"
											placeholder="예) 서울 동대문구 이문동 294-295"
											readOnly
										/>
										<Button onClick={loadLayout}>주소 검색</Button>
									</DivBox>
								</li>
							</Ul>
						</Td>
						<Td>
							<Ul>
								<li>
									<DivBox>
										<InputText
											value={houseInfo.addressDetail}
											name="addressDetail"
											placeholder="상세 주소"
											onChange={changeEvent}
										/>
									</DivBox>
								</li>
							</Ul>
						</Td>
						<Td>
							<Ul>
								<li>
									<DivBox>
										<InputText
											width={10}
											value={houseInfo.floor}
											name="floor"
											placeholder="층수"
											onChange={changeEvent}
										/>
										<Text>층</Text>
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

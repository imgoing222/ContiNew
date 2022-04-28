import { useEffect, useRef, useState } from "react";
import { EventProps } from "src/pages/createSale";
import { Button, DivBox, InputText, Layout, Title } from "./index";
import { Table, Td, Th, Tr, Ul } from "./Table";

function LocationInfo({ houseInfo, changeEvent }: EventProps) {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
		document.body.append(script);
	}, []);

	const loadLayout = () => {
		window.daum.postcode.load(() => {
			const postcode = new window.daum.Postcode({
				oncomplete: function (data) {
					console.log(data);
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
										<InputText width={40} />
										<Button onClick={loadLayout}>주소 검색</Button>
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

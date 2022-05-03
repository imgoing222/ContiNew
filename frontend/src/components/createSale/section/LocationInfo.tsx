import { useEffect } from "react";
import { EventProps } from "src/pages/createSale";
import { Button, InputText } from "../index";
import { Text } from "../Table";
import axios from "axios";
import { Container } from "../Container";
import { TableRowAndHead } from "../TableRow";
import LocationTableData from "../LocationComponent";

function LocationInfo({ houseInfo, changeEvent, setHouseInfo }: EventProps) {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
		document.body.append(script);
	}, []);

	const searchCoordinate = async (data: DaumPostcodeData) => {
		const result = await axios.get(
			`https://dapi.kakao.com/v2/local/search/address.json?query=${data.address}`,
			{
				headers: {
					Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API}`,
				},
				withCredentials: false,
			},
		);
		const { jibunAddress, sido, sigungu, bname } = data;
		const longitude = +result.data.documents[0].x;
		const latitude = +result.data.documents[0].y;
		if (setHouseInfo)
			setHouseInfo({ ...houseInfo, longitude, latitude, jibunAddress, sido, sigungu, bname });
	};
	const loadLayout = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		window.daum.postcode.load(() => {
			const postcode = new window.daum.Postcode({
				oncomplete: function (data) {
					searchCoordinate(data);
				},
			});
			postcode.open();
		});
	};

	return (
		<Container title="위치 정보">
			<TableRowAndHead title="주소">
				<LocationTableData>
					<InputText
						width={40}
						value={houseInfo.jibunAddress}
						name="jibunAddress"
						placeholder="예) 서울 동대문구 이문동 294-295"
						readOnly
					/>
					<Button onClick={loadLayout}>주소 검색</Button>
				</LocationTableData>
				<LocationTableData>
					<InputText
						value={houseInfo.addressDetail}
						name="addressDetail"
						placeholder="상세 주소"
						onChange={changeEvent}
					/>
				</LocationTableData>
				<LocationTableData>
					<InputText
						width={10}
						value={houseInfo.floor}
						name="floor"
						placeholder="층수"
						onChange={changeEvent}
					/>
					<Text>층</Text>
				</LocationTableData>
			</TableRowAndHead>
		</Container>
	);
}

export default LocationInfo;

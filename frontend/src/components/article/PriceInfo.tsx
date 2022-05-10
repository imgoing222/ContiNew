import { HouseInfoProps } from "src/pages/article/[id]";
import Container from "./Container";
import PriceInfoList from "./PriceInfoList";

function PriceInfo({ houseInfo }: HouseInfoProps) {
	return (
		<Container title="가격 정보">
			<PriceInfoList
				name={houseInfo.contract_type}
				content={
					houseInfo.contract_type === "월세"
						? houseInfo.monthly_rent / 10000 + "/" + houseInfo.maintenance_fee / 10000 + " 만원"
						: houseInfo.deposit / 10000 + " 만원"
				}
			/>
			<PriceInfoList
				name="관리비"
				content={`매월 ${houseInfo.maintenance_fee / 10000}만원`}
				content2={houseInfo.maintenance_detail}
				div={true}
			/>
			<PriceInfoList name="주차" content={houseInfo.options.includes(9) ? "가능" : "불가능"} />
			<PriceInfoList
				name="한달 예상 주거비용"
				content={`${houseInfo.monthly_rent / 10000 + houseInfo.maintenance_fee / 10000}+a 만원`}
				content2="월세+관리비+a"
				div={true}
				price={true}
			/>
		</Container>
	);
}

export default PriceInfo;

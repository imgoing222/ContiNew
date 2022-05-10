import HouseInfo from "src/types/houseInfo";
import { toast } from "react-toastify";

function checkData(houseInfo: HouseInfo) {
	const msg = {
		saleType: "매물정보를 선택해주세요",
		houseType: "매물 종류를 선택해주세요",
		contractType: "계약 정보를 선택해주세요",
		deposit: "금액을 입력해주세요",
		monthlyRent: "월세를 입력해주세요",
		maintenanceFee: "관리비를 입력해주세요",
		maintenanceDetail: "관리비 포함 항목을 입력해주세요",
		period: "임대기간을 입력해주세요",
		jibunAddress: "주소를 입력해주세요",
		addressDetail: "상세주소를 입력해주세요",
		floor: "층수를 입력해주세요",
		images: "사진을 업로드해주세요",
		description: "상세설명을 입력해주세요",
	};
	const keys = Object.keys(houseInfo);

	for (const k of keys) {
		if (houseInfo.contractType === "전세" && k === "monthlyRent") continue;
		if (k === "images" && houseInfo.images && houseInfo.images?.length < 3) {
			toast.warning("사진을 최소 3장 업로드해주세요");
			return false;
		}
		if (!houseInfo[k as keyof HouseInfo]) {
			toast.warning(msg[k as keyof typeof msg]);
			console.log(k);
			return false;
		}
	}
	return true;
}

export default checkData;
